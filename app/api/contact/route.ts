import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import Lead from '@/models/Lead';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

/**
 * Public Contact / Quote Submission Endpoint
 */
export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const body = await req.json();
    const { fullName, email, phone, service, company, message, budget, timeline } = body;

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

    // Create Contact document
    const newContact = await Contact.create({
      fullName: cleanedFullName,
      email: cleanedEmail,
      phone: cleanedPhone,
      service: cleanedService,
      company: cleanedCompany,
      budget: cleanedBudget,
      timeline: cleanedTimeline,
      message: cleanedMessage,
      status: 'New',
    });

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

    const contacts = await Contact.find({}).sort({ createdAt: -1 });

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
 * Admin-Protected DELETE Endpoint to remove a contact submission
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

    await Contact.findByIdAndDelete(id);
    try {
      await Lead.findByIdAndDelete(id);
    } catch {}

    return NextResponse.json(
      { success: true, message: 'Contact submission deleted successfully' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact submission' },
      { status: 500, headers: corsHeaders }
    );
  }
}
