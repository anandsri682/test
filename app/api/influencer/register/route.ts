import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Influencer from '@/models/Influencer';
import { sendInfluencerWelcomeEmail } from '@/lib/resend';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/auth';
import { generateSixCharCouponCode } from '@/lib/couponGenerator';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * POST /api/influencer/register
 * Unified Referral Registration Endpoint for both:
 * 1. Individual Referral Partner (fullName, email, phone)
 * 2. Influencer (fullName, email, phone, influencerName, socialAccounts array, etc.)
 */
export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      partnerType = 'individual', // 'individual' | 'influencer'
      influencerName,
      socialAccounts,
      followerCount,
      category,
      message,
      termsAccepted,
    } = body;

    // 1. Validate common fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const cleanedPhone = phone.trim();
    if (cleanedPhone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit mobile number.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        {
          success: false,
          error: 'You must read and agree to the Referral Program Terms and Privacy Policy to proceed.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // 2. Additional validation for Influencers only
    let cleanSocialAccounts: { platform: string; url: string }[] = [];
    if (partnerType === 'influencer') {
      if (!influencerName || !influencerName.trim()) {
        return NextResponse.json(
          { success: false, error: 'Influencer account/display name is required for influencers.' },
          { status: 400, headers: corsHeaders }
        );
      }

      if (!Array.isArray(socialAccounts) || socialAccounts.length === 0) {
        return NextResponse.json(
          { success: false, error: 'At least one social media profile link is required for influencers.' },
          { status: 400, headers: corsHeaders }
        );
      }

      const urlRegex = /^https?:\/\/.+/i;
      const seenUrls = new Set<string>();

      for (const account of socialAccounts) {
        const platform = (account.platform || 'Other').trim();
        const url = (account.url || '').trim();

        if (!url) {
          return NextResponse.json(
            { success: false, error: 'Please provide a valid profile link for all added social accounts.' },
            { status: 400, headers: corsHeaders }
          );
        }

        if (!urlRegex.test(url)) {
          return NextResponse.json(
            { success: false, error: `Invalid URL format: "${url}". Please include http:// or https://.` },
            { status: 400, headers: corsHeaders }
          );
        }

        if (seenUrls.has(url.toLowerCase())) {
          return NextResponse.json(
            { success: false, error: 'Duplicate profile URLs detected within your application.' },
            { status: 400, headers: corsHeaders }
          );
        }

        seenUrls.add(url.toLowerCase());
        cleanSocialAccounts.push({ platform, url });
      }

      if (cleanSocialAccounts.length === 0) {
        return NextResponse.json(
          { success: false, error: 'At least one valid social profile link is required for influencers.' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // 3. Connect to database
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Database service unavailable. Please try again later.' },
        { status: 503, headers: corsHeaders }
      );
    }

    // 4. Duplicate Registration Checks
    const existingByEmail = await Influencer.findOne({ email: normalizedEmail });
    if (existingByEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            'A referral partner registration already exists with this email address. Please check your inbox for your coupon details.',
          code: existingByEmail.couponCode,
        },
        { status: 409, headers: corsHeaders }
      );
    }

    const existingByPhone = await Influencer.findOne({ phone: cleanedPhone });
    if (existingByPhone) {
      return NextResponse.json(
        {
          success: false,
          error: 'A referral partner registration already exists with this mobile number.',
        },
        { status: 409, headers: corsHeaders }
      );
    }

    // 5. Generate Exactly 6-Character Unique Coupon Code
    // Source: Influencer account name for influencers; Full Name for individual partners
    const sourceName = partnerType === 'influencer' && influencerName?.trim()
      ? influencerName.trim()
      : fullName.trim();

    const couponCode = await generateSixCharCouponCode(sourceName);

    // 6. Create Partner Record in MongoDB
    const newPartner = await Influencer.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: cleanedPhone,
      partnerType,
      influencerName: partnerType === 'influencer' ? influencerName?.trim() : '',
      socialAccounts: cleanSocialAccounts,
      platform: cleanSocialAccounts[0]?.platform || '',
      socialProfileUrl: cleanSocialAccounts[0]?.url || '',
      followerCount: (followerCount || '').trim(),
      category: (category || '').trim(),
      message: (message || '').trim(),
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      termsVersion: '1.0',
      status: 'approved',
      couponCode, // strictly 6 alphanumeric characters
      couponActive: true,
      couponCreatedAt: new Date(),
      emailDeliveryStatus: 'pending',
    });

    // 7. Dispatch Resend Welcome Email
    let emailResult: any = { success: false, error: '' };
    try {
      emailResult = await sendInfluencerWelcomeEmail({
        partnerName: newPartner.fullName,
        partnerEmail: newPartner.email,
        partnerType: newPartner.partnerType,
        influencerName: newPartner.influencerName,
        couponCode: newPartner.couponCode,
        socialAccounts: newPartner.socialAccounts,
      });

      if (emailResult.success) {
        await Influencer.findByIdAndUpdate(newPartner._id, {
          emailDeliveryStatus: 'sent',
          emailSentAt: new Date(),
        });
      } else {
        await Influencer.findByIdAndUpdate(newPartner._id, {
          emailDeliveryStatus: 'failed',
          emailDeliveryError: emailResult.error || 'Email dispatch failed',
        });
      }
    } catch (emailErr: unknown) {
      const errObj = emailErr as { message?: string };
      await Influencer.findByIdAndUpdate(newPartner._id, {
        emailDeliveryStatus: 'failed',
        emailDeliveryError: errObj?.message || 'Email dispatch error',
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Referral partner registered successfully! Your unique 6-character coupon code is ready.',
        partner: {
          id: newPartner._id,
          fullName: newPartner.fullName,
          partnerType: newPartner.partnerType,
          influencerName: newPartner.influencerName,
          couponCode: newPartner.couponCode,
          emailDeliveryStatus: emailResult.success ? 'sent' : 'pending_or_failed',
        },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('[Referral Register Error]:', error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A registration with this email, phone, or coupon already exists.' },
        { status: 409, headers: corsHeaders }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to process referral registration. Please try again.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
