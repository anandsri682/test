import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Influencer from '@/models/Influencer';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * Public Endpoint: Validate Coupon Code
 * Accepts GET with ?code=XYZ or POST with { code: "XYZ" }
 * Business Rules:
 * - Regular price: ₹4,999
 * - Discount: ₹1,000
 * - Discounted price: ₹3,999
 * - Case-insensitive match, trimmed
 * - Returns sanitized response without leaking private influencer data
 */
export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  return validateCouponCode(code, corsHeaders);
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  try {
    const body = await req.json();
    const code = body?.code;
    return validateCouponCode(code, corsHeaders);
  } catch {
    return NextResponse.json(
      { valid: false, message: 'Invalid request payload.' },
      { status: 400, headers: corsHeaders }
    );
  }
}

async function validateCouponCode(rawCode: string | null | undefined, corsHeaders: Record<string, string>) {
  if (!rawCode || !rawCode.trim()) {
    return NextResponse.json(
      { valid: false, message: 'Please enter a coupon code.' },
      { status: 400, headers: corsHeaders }
    );
  }

  const normalizedCode = rawCode.trim().toUpperCase();

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { valid: false, message: 'Service temporarily unavailable. Please try again.' },
        { status: 503, headers: corsHeaders }
      );
    }

    const influencer = await Influencer.findOne({ couponCode: normalizedCode });

    if (!influencer) {
      return NextResponse.json(
        {
          valid: false,
          code: normalizedCode,
          message: 'This coupon code is invalid. Please check the code and try again.',
        },
        { status: 404, headers: corsHeaders }
      );
    }

    // Check application status
    if (influencer.status !== 'approved') {
      return NextResponse.json(
        {
          valid: false,
          code: normalizedCode,
          message: 'This coupon is currently unavailable.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if deactivated by admin
    if (!influencer.couponActive) {
      return NextResponse.json(
        {
          valid: false,
          code: normalizedCode,
          message: 'This coupon is currently unavailable.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check expiry date if configured
    if (influencer.couponExpiresAt && new Date(influencer.couponExpiresAt) < new Date()) {
      return NextResponse.json(
        {
          valid: false,
          code: normalizedCode,
          message: 'This coupon has expired.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Construct referrer display label
    // For individual: "Rahul Kumar" -> Referred by: Rahul Kumar
    // For influencer: "Rahul Kumar · Tech With Rahul"
    const partnerType = influencer.partnerType || 'individual';
    let referrerDisplayName = influencer.fullName;
    if (partnerType === 'influencer' && influencer.influencerName) {
      referrerDisplayName = `${influencer.fullName} · ${influencer.influencerName}`;
    }

    // Valid coupon response
    return NextResponse.json(
      {
        valid: true,
        code: normalizedCode,
        message: '₹1,000 SAVED — COUPON APPLIED',
        partnerType,
        referrerName: influencer.fullName,
        referrerDisplayName,
        pricing: {
          regularPrice: 4999,
          discountedPrice: 3999,
          discountAmount: 1000,
          currency: 'INR',
          package: 'Business Website Package',
        },
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, message: 'Error validating coupon code.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
