import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import Lead from '@/models/Lead';
import Influencer from '@/models/Influencer';
import Commission from '@/models/Commission';
import { sendLeadNotificationEmail } from '@/lib/email';
import { sendCustomerConfirmationEmail, sendTeamNotificationEmail } from '@/lib/resend';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * Public Contact / Quote Submission Endpoint (With Optional Influencer Referral Attribution)
 */
export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const body = await req.json();
    const { fullName, email, phone, service, company, message, budget, timeline, couponCode } = body;

    // Server-side validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and phone number are required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Database service unavailable. Please try again later.' },
        { status: 503, headers: corsHeaders }
      );
    }

    const cleanedFullName = fullName.trim();
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPhone = phone.trim();
    const cleanedService = (service || 'Web Development').trim();
    const cleanedCompany = (company || '').trim();
    const cleanedMessage = (message || '').trim();
    const cleanedBudget = (budget || '').trim();
    const cleanedTimeline = (timeline || '').trim();

    // Revalidate optional coupon code on backend
    let matchedInfluencer: any = null;
    let appliedCoupon: string | undefined = undefined;
    let appliedPackagePrice: number | undefined = undefined;
    let appliedDiscountAmount: number | undefined = undefined;

    if (couponCode && typeof couponCode === 'string' && couponCode.trim()) {
      const normalizedCoupon = couponCode.trim().toUpperCase();
      const influencerDoc = await Influencer.findOne({ couponCode: normalizedCoupon });

      if (influencerDoc && influencerDoc.status === 'approved' && influencerDoc.couponActive) {
        if (!influencerDoc.couponExpiresAt || new Date(influencerDoc.couponExpiresAt) >= new Date()) {
          matchedInfluencer = influencerDoc;
          appliedCoupon = normalizedCoupon;
          appliedPackagePrice = 3999;
          appliedDiscountAmount = 1000;
        }
      }
    }

    let partnerType: 'individual' | 'influencer' | undefined = undefined;
    let referrerDisplayName: string | undefined = undefined;

    if (matchedInfluencer) {
      partnerType = matchedInfluencer.partnerType || 'individual';
      referrerDisplayName = matchedInfluencer.fullName;
      if (partnerType === 'influencer' && matchedInfluencer.influencerName) {
        referrerDisplayName = `${matchedInfluencer.fullName} · ${matchedInfluencer.influencerName}`;
      }
    }

    // Create Contact document in MongoDB
    const newContact = await Contact.create({
      fullName: cleanedFullName,
      email: cleanedEmail,
      phone: cleanedPhone,
      service: cleanedService,
      company: cleanedCompany,
      budget: cleanedBudget,
      timeline: cleanedTimeline,
      message: cleanedMessage,
      couponCode: appliedCoupon,
      influencerId: matchedInfluencer ? matchedInfluencer._id : undefined,
      partnerType,
      referrerDisplayName,
      packagePrice: appliedPackagePrice,
      discountAmount: appliedDiscountAmount,
      projectStatus: 'Enquiry',
      paymentStatus: 'Unpaid',
      status: 'New',
    });

    // If a valid coupon was applied, create initial Commission record (status: 'pending')
    if (matchedInfluencer) {
      try {
        await Commission.create({
          influencerId: matchedInfluencer._id,
          couponCode: appliedCoupon,
          leadId: newContact._id,
          customerName: cleanedFullName,
          customerEmail: cleanedEmail,
          packagePrice: appliedPackagePrice || 3999,
          discountAmount: appliedDiscountAmount || 1000,
          commissionRateType: 'fixed',
          commissionAmount: 500, // Standard ₹500 commission per qualifying website package sale
          status: 'pending',
          projectTakeoverStatus: 'pending',
          paymentReceived: false,
        });
      } catch (commErr) {
        console.error('[Commission Creation Error]:', commErr);
      }
    }

    // Also mirror to Lead model for backward compatibility
    try {
      await Lead.create({
        fullName: cleanedFullName,
        email: cleanedEmail,
        phone: cleanedPhone,
        service: cleanedService,
        company: cleanedCompany,
        budget: cleanedBudget,
        timeline: cleanedTimeline,
        message: cleanedMessage || 'Contact form inquiry',
        status: 'New',
      });
    } catch {}

    const submittedAtFormatted = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const emailPayload = {
      customerName: cleanedFullName,
      customerEmail: cleanedEmail,
      phone: cleanedPhone,
      service: cleanedService,
      message: cleanedMessage,
      submittedAt: submittedAtFormatted,
      couponCode: appliedCoupon,
      influencerName: matchedInfluencer ? matchedInfluencer.fullName : undefined,
      packagePrice: appliedPackagePrice,
      discountAmount: appliedDiscountAmount,
    };

    // STEP 5: Send Resend Customer Confirmation Email
    sendCustomerConfirmationEmail(emailPayload).catch((err) => {
      console.error('[Resend Customer Confirmation Dispatch Error]:', err);
    });

    // STEP 6: Send Resend Internal Team Notification Email
    sendTeamNotificationEmail(emailPayload).catch((err) => {
      console.error('[Resend Team Notification Dispatch Error]:', err);
    });

    // Backup Nodemailer dispatch
    sendLeadNotificationEmail({
      fullName: cleanedFullName,
      email: cleanedEmail,
      phone: cleanedPhone,
      service: cleanedService,
      company: cleanedCompany,
      budget: cleanedBudget,
      timeline: cleanedTimeline,
      message: cleanedMessage,
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: 'Request received successfully!',
        id: newContact._id,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Internal server error while saving contact submission' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * Admin-Protected GET Endpoint to fetch all contact submissions
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

    const contacts = await Contact.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        leads: contacts,
        contacts,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve contact inquiries' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * Admin-Protected DELETE Endpoint to remove a contact submission (with financial audit integrity)
 */
export async function DELETE(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  const authUser = verifyAdminAuth(req);
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Contact ID parameter required' },
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

    const contactToArchive = await Contact.findById(id);
    if (!contactToArchive) {
      return NextResponse.json(
        { success: false, error: 'Lead submission not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // Soft-delete to preserve accounting, reporting, and commission auditability
    contactToArchive.isDeleted = true;
    contactToArchive.deletedAt = new Date();
    contactToArchive.deletedBy = authUser.email;
    await contactToArchive.save();

    return NextResponse.json(
      { success: true, message: 'Contact submission archived and safely removed from active view' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact submission' },
      { status: 500, headers: corsHeaders }
    );
  }
}
