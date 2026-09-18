import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Settings from '@/models/Settings';

const defaultSettings = {
  primaryColor: '#087FF5',
  secondaryColor: '#13B89A',
  accentColor: '#FF6A00',
  navyColor: '#0B2A5B',
  contactEmail: 'AVMSmart.official@gmail.com',
  contactPhone: '8978040537',
  officeAddress: 'AVM Smart Solutions, Kurnool, Andhra Pradesh 518002, India',
};

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const settings = await Settings.findOne({});
      return NextResponse.json({ success: true, settings: settings || defaultSettings });
    }
    return NextResponse.json({ success: true, settings: defaultSettings });
  } catch {
    return NextResponse.json({ success: true, settings: defaultSettings });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();
    if (conn) {
      await Settings.findOneAndUpdate({}, { ...body, updatedAt: new Date() }, { upsert: true, new: true });
    }
    return NextResponse.json({ success: true, message: 'Settings saved successfully', settings: body });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
