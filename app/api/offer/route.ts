import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import OfferConfig, { DEFAULT_OFFER_DATA } from '@/models/Offer';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { success: true, offer: DEFAULT_OFFER_DATA },
        { status: 200, headers: corsHeaders }
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
    console.error('[Public Offer API Error]:', error?.message || error);
    return NextResponse.json(
      { success: true, offer: DEFAULT_OFFER_DATA },
      { status: 200, headers: corsHeaders }
    );
  }
}
