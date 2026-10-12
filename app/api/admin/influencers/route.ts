import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Influencer from '@/models/Influencer';
import Contact from '@/models/Contact';
import Commission from '@/models/Commission';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';
import { sendInfluencerWelcomeEmail } from '@/lib/resend';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * GET /api/admin/influencers
 * Returns all influencers with aggregate lead counts, commission totals, and dashboard summary metrics
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
    const contacts = await Contact.find({ couponCode: { $exists: true, $ne: '' } }).sort({ createdAt: -1 });
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
    const convertedCustomers = contacts.filter((c) => c.status === 'Converted' || c.projectStatus === 'Completed').length;

    // Confirmed revenue: sum packagePrice for contacts where paymentStatus === 'Paid'
    const confirmedRevenue = contacts
      .filter((c) => c.paymentStatus === 'Paid')
      .reduce((sum, c) => sum + (c.packagePrice || 3999), 0);

    const pendingCommissions = commissions
      .filter((c) => c.status === 'pending' || c.status === 'eligible')
      .reduce((sum, c) => sum + (c.commissionAmount || 500), 0);

    const paidCommissions = commissions
      .filter((c) => c.status === 'paid')
      .reduce((sum, c) => sum + (c.commissionAmount || 500), 0);

    // Attach referral counts and commission summaries to each influencer
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
        (c) => c.status === 'Converted' || c.projectStatus === 'Completed'
      ).length;

      const commEarned = infCommissions.reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
      const commPaid = infCommissions
        .filter((c) => c.status === 'paid')
        .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
      const commPending = infCommissions
        .filter((c) => c.status !== 'paid' && c.status !== 'cancelled')
        .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

      return {
        ...inf.toObject(),
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
 * - update_status: Change influencer application status ('approved', 'pending', 'rejected')
 * - update_project: Update project takeover status ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')
 * - update_payment: Update payment status on a lead & commission
 * - record_payout: Record commission payout with transaction note
 * - resend_email: Retries sending coupon welcome email via Resend
 * - update_notes: Add internal admin note
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
      return NextResponse.json({ success: true, couponActive: influencer.couponActive }, { status: 200, headers: corsHeaders });
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
        influencerName: influencer.fullName,
        influencerEmail: influencer.email,
        couponCode: influencer.couponCode,
        platform: influencer.platform,
      });

      if (emailResult.success) {
        influencer.emailDeliveryStatus = 'sent';
        influencer.emailSentAt = new Date();
        influencer.emailDeliveryError = '';
        await influencer.save();
        return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200, headers: corsHeaders });
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

        // Check if eligibility conditions are met: Payment received & Project taken over
        if (
          commission.paymentReceived &&
          (commission.projectTakeoverStatus === 'accepted' ||
            commission.projectTakeoverStatus === 'in_progress' ||
            commission.projectTakeoverStatus === 'completed')
        ) {
          if (commission.status === 'pending') {
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
          if (commission.status === 'pending') {
            commission.status = 'eligible';
          }
        } else if (!commission.paymentReceived && commission.status === 'eligible') {
          commission.status = 'pending';
        }
        await commission.save();
      }

      return NextResponse.json({ success: true, paymentStatus }, { status: 200, headers: corsHeaders });
    }

    if (action === 'record_commission_payout') {
      const { paymentReference, adminNotes } = body;
      const commission = await Commission.findById(commissionId);
      if (!commission) {
        return NextResponse.json({ success: false, error: 'Commission record not found' }, { status: 404, headers: corsHeaders });
      }

      // Enforce business takeover condition before payout
      if (
        !commission.paymentReceived ||
        (commission.projectTakeoverStatus !== 'accepted' &&
          commission.projectTakeoverStatus !== 'in_progress' &&
          commission.projectTakeoverStatus !== 'completed')
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Commission payout cannot be recorded prematurely. Project must be officially taken over and client payment cleared.',
          },
          { status: 400, headers: corsHeaders }
        );
      }

      commission.status = 'paid';
      commission.paidAt = new Date();
      commission.paidBy = authUser.email;
      if (paymentReference) commission.paymentReference = paymentReference;
      if (adminNotes) commission.adminNotes = adminNotes;
      await commission.save();

      return NextResponse.json({ success: true, commission }, { status: 200, headers: corsHeaders });
    }

    return NextResponse.json({ success: false, error: 'Unknown action specified' }, { status: 400, headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process admin action' },
      { status: 500, headers: corsHeaders }
    );
  }
}
