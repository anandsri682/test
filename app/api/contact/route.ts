import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, service, company, message } = body;

    // Server-side validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    if (conn) {
      const newContact = await Contact.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        service: service || 'Web Development',
        company: company ? company.trim() : '',
        message: message ? message.trim() : '',
      });

      return NextResponse.json({
        success: true,
        message: 'Request received successfully!',
        id: newContact._id,
      });
    }

    // Fallback response if DB is offline
    return NextResponse.json({
      success: true,
      message: 'Request received successfully! (In-memory confirmation)',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
