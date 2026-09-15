import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Review from '@/models/Review';
import { TESTIMONIALS } from '@/data/siteData';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const dbReviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
      if (dbReviews && dbReviews.length > 0) {
        return NextResponse.json({ success: true, reviews: dbReviews });
      }
    }
    return NextResponse.json({ success: true, reviews: TESTIMONIALS });
  } catch {
    return NextResponse.json({ success: true, reviews: TESTIMONIALS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, company, quote, rating } = body;

    if (!name || !quote) {
      return NextResponse.json({ success: false, error: 'Name and testimonial text are required.' }, { status: 400 });
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

      return NextResponse.json({ success: true, message: 'Review submitted successfully!', review: newReview });
    }

    return NextResponse.json({ success: true, message: 'Review recorded!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
