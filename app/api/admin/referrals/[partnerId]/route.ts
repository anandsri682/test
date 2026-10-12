import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Influencer from '@/models/Influencer';
import Contact from '@/models/Contact';
import Commission from '@/models/Commission';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * GET /api/admin/referrals/[partnerId]
 * Fetches dedicated referral partner profile, performance analytics, and associated leads
 */
export async function GET(req: Request, context: { params: Promise<{ partnerId: string }> }) {
  const corsHeaders = getCorsHeaders(req);

  const authUser = verifyAdminAuth(req);
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const { partnerId } = await context.params;
    if (!partnerId) {
      return NextResponse.json(
        { success: false, error: 'Partner identifier is required' },
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

    // Resolve partner either by ObjectId or by 6-char coupon code
    let partner: any = null;
    if (mongoose.Types.ObjectId.isValid(partnerId)) {
      partner = await Influencer.findById(partnerId);
    }
    if (!partner) {
      partner = await Influencer.findOne({ couponCode: partnerId.trim().toUpperCase() });
    }

    if (!partner) {
      return NextResponse.json(
        { success: false, error: 'Referral partner not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // Fetch leads attributed to this partner
    const leads = await Contact.find({
      $or: [
        { influencerId: partner._id },
        { couponCode: partner.couponCode.toUpperCase() },
      ],
      isDeleted: { $ne: true },
    }).sort({ createdAt: -1 });

    // Fetch commissions attributed to this partner
    const commissions = await Commission.find({
      influencerId: partner._id,
    }).sort({ createdAt: -1 });

    // Calculate real database-derived analytics
    const totalReferred = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New' || !l.status).length;
    const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
    const convertedLeads = leads.filter((l) => l.status === 'Converted').length;
    const achievedLeads = leads.filter((l) => l.status === 'Achieved').length;
    const cancelledLeads = leads.filter((l) => l.status === 'Cancelled' || l.projectStatus === 'Cancelled').length;

    // Conversion rate: (converted + achieved) / totalReferred * 100
    const successfulConversions = convertedLeads + achievedLeads;
    const conversionRate = totalReferred > 0 ? Number(((successfulConversions / totalReferred) * 100).toFixed(1)) : 0;

    // Financial totals
    const totalQualifyingProjectValue = leads
      .filter((l) => l.status === 'Converted' || l.status === 'Achieved')
      .reduce((sum, l) => sum + (l.finalProjectAmount || l.packagePrice || 3999), 0);

    const totalCommissionEarned = commissions
      .filter((c) => c.status !== 'cancelled' && c.status !== 'reversed')
      .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

    const pendingCommission = commissions
      .filter((c) => c.status === 'pending' || c.status === 'pending_qualification')
      .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

    const eligibleCommission = commissions
      .filter((c) => c.status === 'eligible' || c.status === 'pending_payment')
      .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

    const commissionPaid = commissions
      .filter((c) => c.status === 'paid')
      .reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

    const successfulPayoutCount = commissions.filter((c) => c.status === 'paid').length;

    // Mask sensitive bank account number
    const partnerObj: any = partner.toObject();
    if (partnerObj.bankDetails?.accountNumber) {
      const acc = partnerObj.bankDetails.accountNumber;
      partnerObj.bankDetails.accountNumber = acc.length > 4 ? `••••••••${acc.slice(-4)}` : '••••';
    }

    return NextResponse.json(
      {
        success: true,
        partner: partnerObj,
        analytics: {
          totalReferred,
          newLeads,
          contactedLeads,
          convertedLeads,
          achievedLeads,
          cancelledLeads,
          conversionRate,
          totalQualifyingProjectValue,
          totalCommissionEarned,
          pendingCommission,
          eligibleCommission,
          commissionPaid,
          successfulPayoutCount,
        },
        leads,
        commissions,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('[Admin Referrals Detail GET Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve referral partner profile' },
      { status: 500, headers: corsHeaders }
    );
  }
}
