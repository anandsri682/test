import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Influencer from '@/models/Influencer';
import Contact from '@/models/Contact';
import Commission from '@/models/Commission';
import AuditLog from '@/models/AuditLog';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';
import { sendInfluencerWelcomeEmail, sendCommissionNotificationEmail } from '@/lib/resend';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * GET /api/admin/influencers
 * Returns all referral partners with real DB aggregations, masked payment details, and commissions
 */
export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  const authUser = verifyAdminAuth(req);
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Database service unavailable' },
        { status: 503, headers: corsHeaders }
      );
    }

    const influencers = await Influencer.find({}).sort({ createdAt: -1 });
    const contacts = await Contact.find({
      couponCode: { $exists: true, $ne: '' },
      isDeleted: { $ne: true },
    }).sort({ createdAt: -1 });
    const commissions = await Commission.find({}).sort({ createdAt: -1 });

    // Aggregate statistics
    const totalApplications = influencers.length;
    const individualPartners = influencers.filter((i) => i.partnerType === 'individual').length;
    const influencerPartners = influencers.filter((i) => i.partnerType === 'influencer').length;
    const pendingApplications = influencers.filter((i) => i.status === 'pending').length;
    const approvedInfluencers = influencers.filter((i) => i.status === 'approved').length;
    const activeCoupons = influencers.filter((i) => i.couponActive && i.status === 'approved').length;
    const failedEmails = influencers.filter((i) => i.emailDeliveryStatus === 'failed').length;

    const totalReferredLeads = contacts.length;
    const convertedCustomers = contacts.filter(
      (c) => c.status === 'Converted' || c.status === 'Achieved' || c.projectStatus === 'Completed'
    ).length;

    // Confirmed revenue: sum finalProjectAmount or packagePrice for converted/achieved leads
    const confirmedRevenue = contacts
      .filter((c) => c.status === 'Converted' || c.status === 'Achieved' || c.paymentStatus === 'Paid')
      .reduce((sum, c) => sum + (c.finalProjectAmount || c.packagePrice || 3999), 0);

    const pendingCommissions = commissions
      .filter((c) => c.status !== 'paid' && c.status !== 'cancelled' && c.status !== 'reversed')
      .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

    const paidCommissions = commissions
      .filter((c) => c.status === 'paid')
      .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

    // Attach referral counts, commission summaries, and masked payment info to each partner
    const enrichedInfluencers = influencers.map((inf) => {
      const infLeads = contacts.filter(
        (c) =>
          (c.influencerId && c.influencerId.toString() === inf._id.toString()) ||
          (c.couponCode && c.couponCode.toUpperCase() === inf.couponCode.toUpperCase())
      );
      const infCommissions = commissions.filter(
        (comm) => comm.influencerId && comm.influencerId.toString() === inf._id.toString()
      );

      const convertedCount = infLeads.filter(
        (c) => c.status === 'Converted' || c.status === 'Achieved' || c.projectStatus === 'Completed'
      ).length;

      const commEarned = infCommissions.reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
      const commPaid = infCommissions
        .filter((c) => c.status === 'paid')
        .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
      const commPending = infCommissions
        .filter((c) => c.status !== 'paid' && c.status !== 'cancelled' && c.status !== 'reversed')
        .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

      const obj: any = inf.toObject();

      // Mask sensitive bank account number
      if (obj.bankDetails?.accountNumber) {
        const acc = obj.bankDetails.accountNumber;
        obj.bankDetails.accountNumber = acc.length > 4 ? `••••••••${acc.slice(-4)}` : '••••';
      }

      return {
        ...obj,
        totalLeads: infLeads.length,
        convertedSales: convertedCount,
        commissionEarned: commEarned,
        commissionPaid: commPaid,
        commissionPending: commPending,
      };
    });

    return NextResponse.json(
      {
        success: true,
        stats: {
          totalApplications,
          individualPartners,
          influencerPartners,
          pendingApplications,
          approvedInfluencers,
          activeCoupons,
          failedEmails,
          totalReferredLeads,
          convertedCustomers,
          confirmedRevenue,
          pendingCommissions,
          paidCommissions,
        },
        influencers: enrichedInfluencers,
        referredLeads: contacts,
        commissions,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve influencer records' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * PATCH /api/admin/influencers
 * Actions:
 * - toggle_coupon: Activate or deactivate coupon code
 * - deactivate_partner: Deactivates coupon & archives partner with preservation of historical commissions
 * - update_status: Change influencer application status ('approved', 'pending', 'rejected', 'deactivated')
 * - update_project_takeover: Update project status
 * - update_payment_status: Update payment status on a lead & commission
 * - record_commission_payout: Record actual commission payout with transaction ref
 * - retry_commission_email: Exactly-once idempotent retry for failed commission conversion email
 * - resend_email: Retries sending coupon welcome email
 * - update_payment_details: Safely store/update partner payout methods
 */
export async function PATCH(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  const authUser = verifyAdminAuth(req);
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json();
    const { action, id, leadId, commissionId } = body;

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Database service unavailable' },
        { status: 503, headers: corsHeaders }
      );
    }

    if (action === 'toggle_coupon') {
      const influencer = await Influencer.findById(id);
      if (!influencer) {
        return NextResponse.json({ success: false, error: 'Influencer not found' }, { status: 404, headers: corsHeaders });
      }
      influencer.couponActive = !influencer.couponActive;
      await influencer.save();

      try {
        await AuditLog.create({
          action: 'partner_deactivated',
          adminEmail: authUser.email,
          targetType: 'Influencer',
          targetId: influencer._id,
          details: { couponActive: influencer.couponActive, couponCode: influencer.couponCode },
        });
      } catch {}

      return NextResponse.json({ success: true, couponActive: influencer.couponActive }, { status: 200, headers: corsHeaders });
    }

    if (action === 'deactivate_partner') {
      const influencer = await Influencer.findById(id);
      if (!influencer) {
        return NextResponse.json({ success: false, error: 'Partner record not found' }, { status: 404, headers: corsHeaders });
      }

      // Deactivate coupon so it cannot be used for future enquiries, preserving all historical commissions
      influencer.couponActive = false;
      influencer.status = 'deactivated';
      influencer.archivedAt = new Date();
      influencer.archivedBy = authUser.email;
      await influencer.save();

      try {
        await AuditLog.create({
          action: 'partner_deactivated',
          adminEmail: authUser.email,
          targetType: 'Influencer',
          targetId: influencer._id,
          details: { fullName: influencer.fullName, couponCode: influencer.couponCode, reason: body.reason || '' },
        });
      } catch {}

      return NextResponse.json(
        { success: true, message: 'Partner deactivated and coupon disabled successfully' },
        { status: 200, headers: corsHeaders }
      );
    }

    if (action === 'update_status') {
      const { status, internalNotes } = body;
      const influencer = await Influencer.findById(id);
      if (!influencer) {
        return NextResponse.json({ success: false, error: 'Influencer not found' }, { status: 404, headers: corsHeaders });
      }
      influencer.status = status;
      if (internalNotes) influencer.internalNotes = internalNotes;
      if (status === 'approved') {
        influencer.approvedAt = new Date();
        influencer.approvedBy = authUser.email;
      }
      await influencer.save();
      return NextResponse.json({ success: true, status: influencer.status }, { status: 200, headers: corsHeaders });
    }

    if (action === 'resend_email') {
      const influencer = await Influencer.findById(id);
      if (!influencer) {
        return NextResponse.json({ success: false, error: 'Influencer not found' }, { status: 404, headers: corsHeaders });
      }

      const emailResult = await sendInfluencerWelcomeEmail({
        partnerName: influencer.fullName,
        partnerEmail: influencer.email,
        partnerType: influencer.partnerType,
        influencerName: influencer.influencerName,
        couponCode: influencer.couponCode,
        socialAccounts: influencer.socialAccounts,
      });

      if (emailResult.success) {
        influencer.emailDeliveryStatus = 'sent';
        influencer.emailSentAt = new Date();
        influencer.emailDeliveryError = '';
        await influencer.save();
        return NextResponse.json({ success: true, message: 'Welcome email sent successfully!' }, { status: 200, headers: corsHeaders });
      } else {
        influencer.emailDeliveryStatus = 'failed';
        influencer.emailDeliveryError = emailResult.error || 'Failed to dispatch';
        await influencer.save();
        return NextResponse.json(
          { success: false, error: emailResult.error || 'Failed to dispatch email' },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    if (action === 'update_project_takeover') {
      const { projectStatus } = body;
      const contact = await Contact.findById(leadId);
      if (!contact) {
        return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404, headers: corsHeaders });
      }
      contact.projectStatus = projectStatus;
      await contact.save();

      // Mirror to Commission record
      const commission = await Commission.findOne({ leadId: contact._id });
      if (commission) {
        commission.projectTakeoverStatus =
          projectStatus === 'Project_Accepted'
            ? 'accepted'
            : projectStatus === 'In_Progress'
            ? 'in_progress'
            : projectStatus === 'Completed'
            ? 'completed'
            : projectStatus === 'Cancelled'
            ? 'cancelled'
            : 'pending';

        if (
          commission.paymentReceived &&
          (commission.projectTakeoverStatus === 'accepted' ||
            commission.projectTakeoverStatus === 'in_progress' ||
            commission.projectTakeoverStatus === 'completed')
        ) {
          if (commission.status === 'pending' || commission.status === 'pending_qualification') {
            commission.status = 'eligible';
          }
        }
        await commission.save();
      }

      return NextResponse.json({ success: true, projectStatus }, { status: 200, headers: corsHeaders });
    }

    if (action === 'update_payment_status') {
      const { paymentStatus } = body;
      const contact = await Contact.findById(leadId);
      if (!contact) {
        return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404, headers: corsHeaders });
      }
      contact.paymentStatus = paymentStatus;
      await contact.save();

      const commission = await Commission.findOne({ leadId: contact._id });
      if (commission) {
        commission.paymentReceived = paymentStatus === 'Paid';
        if (
          commission.paymentReceived &&
          (commission.projectTakeoverStatus === 'accepted' ||
            commission.projectTakeoverStatus === 'in_progress' ||
            commission.projectTakeoverStatus === 'completed')
        ) {
          if (commission.status === 'pending' || commission.status === 'pending_qualification') {
            commission.status = 'eligible';
          }
        } else if (!commission.paymentReceived && commission.status === 'eligible') {
          commission.status = 'pending_qualification';
        }
        await commission.save();
      }

      return NextResponse.json({ success: true, paymentStatus }, { status: 200, headers: corsHeaders });
    }

    if (action === 'record_commission_payout') {
      const { paymentReference, payoutMethod, adminNotes } = body;
      const commission = await Commission.findById(commissionId);
      if (!commission) {
        return NextResponse.json({ success: false, error: 'Commission record not found' }, { status: 404, headers: corsHeaders });
      }

      commission.status = 'paid';
      commission.paidAt = new Date();
      commission.paidBy = authUser.email;
      if (paymentReference) {
        commission.paymentReference = paymentReference;
        commission.payoutTransactionRef = paymentReference;
      }
      if (payoutMethod) commission.payoutMethod = payoutMethod;
      if (adminNotes) commission.adminNotes = adminNotes;
      await commission.save();

      try {
        await AuditLog.create({
          action: 'commission_payout',
          adminEmail: authUser.email,
          targetType: 'Commission',
          targetId: commission._id,
          details: {
            amount: commission.commissionAmount,
            payoutMethod: commission.payoutMethod,
            payoutTransactionRef: paymentReference || '',
            recipient: commission.customerName,
          },
        });
      } catch {}

      return NextResponse.json({ success: true, commission }, { status: 200, headers: corsHeaders });
    }

    // Exactly-Once Idempotent Retry for Failed Commission Notification Email
    if (action === 'retry_commission_email') {
      const commission = await Commission.findById(commissionId);
      if (!commission) {
        return NextResponse.json({ success: false, error: 'Commission record not found' }, { status: 404, headers: corsHeaders });
      }

      if (commission.notificationStatus === 'sent') {
        return NextResponse.json(
          { success: true, message: 'Conversion email was already sent previously to this partner.' },
          { status: 200, headers: corsHeaders }
        );
      }

      const partner = await Influencer.findById(commission.influencerId);
      if (!partner) {
        return NextResponse.json({ success: false, error: 'Referral partner not found' }, { status: 404, headers: corsHeaders });
      }

      const lead = await Contact.findById(commission.leadId);

      commission.notificationAttemptCount = (commission.notificationAttemptCount || 0) + 1;

      const emailResult = await sendCommissionNotificationEmail({
        partnerName: partner.fullName,
        partnerEmail: partner.email,
        clientName: commission.customerName || (lead ? lead.fullName : 'Client'),
        projectName: lead ? lead.service : 'Website Solution',
        finalProjectAmount: commission.finalProjectAmount || commission.packagePrice || 3999,
        commissionRate: commission.commissionRate || 10,
        commissionAmount: commission.commissionAmount,
        commissionStatus: commission.status === 'paid' ? 'Paid' : commission.status === 'eligible' ? 'Eligible for Payout' : 'Pending Milestone Qualification',
      });

      if (emailResult.success) {
        commission.notificationStatus = 'sent';
        commission.notificationSentAt = new Date();
        commission.notificationError = '';
        await commission.save();

        try {
          await AuditLog.create({
            action: 'notification_retry',
            adminEmail: authUser.email,
            targetType: 'Commission',
            targetId: commission._id,
            details: { partnerEmail: partner.email, status: 'sent' },
          });
        } catch {}

        return NextResponse.json({ success: true, message: 'Commission conversion email sent successfully!' }, { status: 200, headers: corsHeaders });
      } else {
        commission.notificationStatus = 'failed';
        commission.notificationError = emailResult.error || 'Failed to dispatch email';
        await commission.save();
        return NextResponse.json(
          { success: false, error: emailResult.error || 'Failed to dispatch email' },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    if (action === 'update_payment_details') {
      const { paymentMethod, upiId, upiMobile, bankDetails } = body;
      const partner = await Influencer.findById(id);
      if (!partner) {
        return NextResponse.json({ success: false, error: 'Partner record not found' }, { status: 404, headers: corsHeaders });
      }

      if (paymentMethod) partner.paymentMethod = paymentMethod;
      if (upiId !== undefined) partner.upiId = upiId.trim();
      if (upiMobile !== undefined) partner.upiMobile = upiMobile.trim();
      if (bankDetails) {
        partner.bankDetails = {
          accountHolderName: bankDetails.accountHolderName?.trim() || '',
          bankName: bankDetails.bankName?.trim() || '',
          accountNumber: bankDetails.accountNumber?.trim() || '',
          ifscCode: bankDetails.ifscCode?.trim()?.toUpperCase() || '',
        };
      }
      await partner.save();

      try {
        await AuditLog.create({
          action: 'payment_details_updated',
          adminEmail: authUser.email,
          targetType: 'Influencer',
          targetId: partner._id,
          details: { paymentMethod: partner.paymentMethod, upiId: partner.upiId ? 'provided' : 'none' },
        });
      } catch {}

      return NextResponse.json({ success: true, message: 'Payment details updated securely' }, { status: 200, headers: corsHeaders });
    }

    return NextResponse.json({ success: false, error: 'Unknown action specified' }, { status: 400, headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process admin action' },
      { status: 500, headers: corsHeaders }
    );
  }
}
