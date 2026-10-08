import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import OfferConfig, { DEFAULT_OFFER_DATA } from '@/models/Offer';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

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

    let config = await OfferConfig.findOne({});
    if (!config) {
      config = await OfferConfig.create(DEFAULT_OFFER_DATA);
    }

    return NextResponse.json(
      {
        success: true,
        offer: config,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    console.error('[Admin Offer GET Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve offer configuration' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: Request) {
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
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: false, error: 'Database service unavailable' },
        { status: 503, headers: corsHeaders }
      );
    }

    let config = await OfferConfig.findOne({});
    if (!config) {
      config = new OfferConfig(DEFAULT_OFFER_DATA);
    }

    if (typeof body.enabled === 'boolean') config.enabled = body.enabled;
    if (body.headline) config.headline = body.headline.trim();
    if (body.price) config.price = body.price.trim();
    if (body.bannerText) config.bannerText = body.bannerText.trim();
    if (body.bannerCta) config.bannerCta = body.bannerCta.trim();
    if (body.popupSupportingText) config.popupSupportingText = body.popupSupportingText.trim();
    if (body.landingHeadline) config.landingHeadline = body.landingHeadline.trim();
    if (body.landingSubtext) config.landingSubtext = body.landingSubtext.trim();
    if (body.ctaLink) config.ctaLink = body.ctaLink.trim();
    if (Array.isArray(body.benefits)) config.benefits = body.benefits;

    await config.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Offer configuration updated successfully!',
        offer: config,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    console.error('[Admin Offer POST Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: 'Failed to save offer configuration' },
      { status: 500, headers: corsHeaders }
    );
  }
}
