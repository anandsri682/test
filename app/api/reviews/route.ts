import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Review from '@/models/Review';
import { TESTIMONIALS } from '@/data/siteData';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbReviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
      if (dbReviews && dbReviews.length > 0) {
        return NextResponse.json(
          { success: true, reviews: dbReviews },
          { status: 200, headers: corsHeaders }
        );
      }
    }
    return NextResponse.json(
      { success: true, reviews: TESTIMONIALS },
      { status: 200, headers: corsHeaders }
    );
  } catch {
    return NextResponse.json(
      { success: true, reviews: TESTIMONIALS },
      { status: 200, headers: corsHeaders }
    );
  }
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  try {
    const body = await req.json();
    const { name, role, company, quote, rating } = body;

    if (!name || !quote) {
      return NextResponse.json(
        { success: false, error: 'Name and testimonial text are required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const conn = await connectToDatabase();
    if (conn) {
      const newReview = await Review.create({
        name: name.trim(),
        role: role || 'Client',
        company: company || 'Digital Project',
        quote: quote.trim(),
        rating: Number(rating) || 5,
        approved: true,
      });

      return NextResponse.json(
        { success: true, message: 'Review submitted successfully!', review: newReview },
        { status: 201, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Review recorded!' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to submit review' },
      { status: 500, headers: corsHeaders }
    );
  }
}
