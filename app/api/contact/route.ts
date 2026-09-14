import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Lead from '@/models/Lead';

// In-memory fallback store when DB is offline
const memoryLeads: any[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, company, service, budget, timeline, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Full Name, Email, and Message are required fields.' },
        { status: 400 }
      );
    }

    const newLeadData = {
      id: Date.now().toString(),
      fullName,
      email,
      phone: phone || '',
      company: company || '',
      service: service || 'General Inquiry',
      budget: budget || '',
      timeline: timeline || '',
      message,
      status: 'New',
      createdAt: new Date(),
    };

    const conn = await connectToDatabase();
    if (conn) {
      const dbLead = new Lead(newLeadData);
      await dbLead.save();
    } else {
      memoryLeads.unshift(newLeadData);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully. Our team will get back to you within 24 hours.',
    });
  } catch (error: any) {
    console.error('API /contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing your inquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const leads = await Lead.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, leads });
    }
    return NextResponse.json({ success: true, leads: memoryLeads });
  } catch (error: any) {
    return NextResponse.json({ success: true, leads: memoryLeads });
  }
}
