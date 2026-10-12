import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import Lead from '@/models/Lead';
import Influencer from '@/models/Influencer';
import Commission from '@/models/Commission';
import AuditLog from '@/models/AuditLog';
import { sendCommissionNotificationEmail } from '@/lib/resend';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * PATCH /api/admin/leads
 * Handles lead status transitions with:
 * - Server-side validation & irreversible transition protection
 * - Concurrency protection (expectedCurrentStatus check)
 * - Final project amount validation & 10% commission calculation
 * - Exactly-once idempotent email notification to referral partners
 * - Full audit logging
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
    const {
      id,
      status,
      expectedCurrentStatus,
      finalProjectAmount,
      customerPaymentConfirmed,
      projectTakeoverConfirmed,
      conversionNotes,
      adminOverride,
      overrideReason,
    } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Lead/Contact ID and requested status are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Database service unavailable' },
        { status: 503, headers: corsHeaders }
      );
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    const currentStatus = contact.status || 'New';

    // 1. Concurrency Protection Check
    if (expectedCurrentStatus && expectedCurrentStatus !== currentStatus) {
      return NextResponse.json(
        {
          success: false,
          error: `Concurrent update detected: Lead status was already changed to '${currentStatus}' by another administrator. Please refresh your view.`,
          currentStatus,
        },
        { status: 409, headers: corsHeaders }
      );
    }

    // 2. Irreversible Transition Protection
    // Converted leads cannot move backward to New or Contacted
    if (currentStatus === 'Converted' && (status === 'New' || status === 'Contacted')) {
      if (!adminOverride || !overrideReason) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Invalid status transition: A Converted lead cannot be moved back to New or Contacted. An authorized administrative override with an audit reason is required for corrections.',
          },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Achieved leads cannot move backward to New, Contacted, Converted, or Cancelled
    if (
      currentStatus === 'Achieved' &&
      (status === 'New' || status === 'Contacted' || status === 'Converted' || status === 'Cancelled')
    ) {
      if (!adminOverride || !overrideReason) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Invalid status transition: An Achieved lead represents a completed milestone and cannot be moved back to earlier stages.',
          },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // 3. Handling Transition to Converted (Commission Triggering Milestone)
    let generatedCommission: any = null;
    let emailSent = false;
    let emailError = '';

    if (status === 'Converted') {
      const parsedAmount = Number(finalProjectAmount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return NextResponse.json(
          {
            success: false,
            error:
              'A valid positive final qualifying project amount in INR is required to confirm project conversion and calculate commission.',
          },
          { status: 400, headers: corsHeaders }
        );
      }

      // Backend recalculates exactly 10% commission
      const calculatedCommission = Math.round(parsedAmount * 0.1);

      contact.status = 'Converted';
      contact.finalProjectAmount = parsedAmount;
      contact.commissionRate = 10;
      contact.calculatedCommission = calculatedCommission;
      contact.convertedAt = new Date();
      contact.convertedBy = authUser.email;
      contact.customerPaymentConfirmed = !!customerPaymentConfirmed;
      contact.projectTakeoverConfirmed = !!projectTakeoverConfirmed;
      if (conversionNotes) contact.conversionNotes = conversionNotes;

      await contact.save();

      // Check if lead has an associated referral partner
      let partnerDoc: any = null;
      if (contact.influencerId) {
        partnerDoc = await Influencer.findById(contact.influencerId);
      } else if (contact.couponCode) {
        partnerDoc = await Influencer.findOne({ couponCode: contact.couponCode });
      }

      if (partnerDoc) {
        // Find or create Commission record
        let commission = await Commission.findOne({ leadId: contact._id });

        const isTakeoverAndPaymentMet = !!customerPaymentConfirmed && !!projectTakeoverConfirmed;
        const commissionStatus = isTakeoverAndPaymentMet ? 'eligible' : 'pending_qualification';

        if (!commission) {
          commission = new Commission({
            influencerId: partnerDoc._id,
            couponCode: partnerDoc.couponCode,
            leadId: contact._id,
            customerName: contact.fullName,
            customerEmail: contact.email,
            finalProjectAmount: parsedAmount,
            commissionRate: 10,
            commissionAmount: calculatedCommission,
            status: commissionStatus,
            customerPaymentConfirmed: !!customerPaymentConfirmed,
            projectTakeoverConfirmed: !!projectTakeoverConfirmed,
            confirmedBy: authUser.email,
            confirmedAt: new Date(),
            idempotencyKey: `commission_converted_${contact._id}`,
            notificationStatus: 'pending',
            notificationAttemptCount: 0,
          });
        } else {
          // Update existing commission without duplicating
          commission.finalProjectAmount = parsedAmount;
          commission.commissionAmount = calculatedCommission;
          commission.commissionRate = 10;
          commission.status = commissionStatus;
          commission.customerPaymentConfirmed = !!customerPaymentConfirmed;
          commission.projectTakeoverConfirmed = !!projectTakeoverConfirmed;
          commission.confirmedBy = authUser.email;
          commission.confirmedAt = new Date();
        }

        // Exactly-Once Notification Check: send only if not already sent
        if (commission.notificationStatus !== 'sent') {
          commission.notificationAttemptCount = (commission.notificationAttemptCount || 0) + 1;
          const emailResult = await sendCommissionNotificationEmail({
            partnerName: partnerDoc.fullName,
            partnerEmail: partnerDoc.email,
            clientName: contact.fullName,
            projectName: contact.service || 'Custom Website Solution',
            finalProjectAmount: parsedAmount,
            commissionRate: 10,
            commissionAmount: calculatedCommission,
            commissionStatus:
              commissionStatus === 'eligible' ? 'Eligible for Payout' : 'Pending Milestone Qualification',
          });

          if (emailResult.success) {
            commission.notificationStatus = 'sent';
            commission.notificationSentAt = new Date();
            commission.notificationError = '';
            emailSent = true;
          } else {
            commission.notificationStatus = 'failed';
            commission.notificationError = emailResult.error || 'Failed to dispatch email';
            emailError = commission.notificationError;
          }
        }

        await commission.save();
        generatedCommission = commission;
      }
    } else {
      // Transition to other states
      contact.status = status;
      await contact.save();
    }

    // Mirror status to Lead model if exists
    try {
      await Lead.findByIdAndUpdate(id, { status });
    } catch {}

    // 4. Audit Log
    try {
      await AuditLog.create({
        action: status === 'Converted' ? 'conversion_confirmed' : 'status_change',
        adminEmail: authUser.email,
        targetType: 'Contact',
        targetId: contact._id,
        details: {
          previousStatus: currentStatus,
          newStatus: status,
          finalProjectAmount: contact.finalProjectAmount,
          calculatedCommission: contact.calculatedCommission,
          adminOverride: !!adminOverride,
          overrideReason: overrideReason || '',
          emailSent,
          emailError,
        },
      });
    } catch (auditErr) {
      console.error('[Audit Log Error]:', auditErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Lead status updated to ${status} successfully`,
        lead: contact,
        commission: generatedCommission,
        notification: {
          sent: emailSent,
          error: emailError || null,
        },
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    console.error('[Admin Leads PATCH Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update lead status' },
      { status: 500, headers: corsHeaders }
    );
  }
}
