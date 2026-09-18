import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

const defaultSettings = {
  primaryColor: '#087FF5',
  secondaryColor: '#13B89A',
  accentColor: '#FF6A00',
  navyColor: '#0B2A5B',
  contactEmail: 'AVMSmart.official@gmail.com',
  contactPhone: '8978040537',
  officeAddress: 'AVM Smart Solutions, Kurnool, Andhra Pradesh 518002, India',
};

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const settings = await Settings.findOne({});
      return NextResponse.json(
        { success: true, settings: settings || defaultSettings },
        { status: 200, headers: corsHeaders }
      );
    }
    return NextResponse.json(
      { success: true, settings: defaultSettings },
      { status: 200, headers: corsHeaders }
    );
  } catch {
    return NextResponse.json(
      { success: true, settings: defaultSettings },
      { status: 200, headers: corsHeaders }
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
    if (conn) {
      await Settings.findOneAndUpdate({}, { ...body, updatedAt: new Date() }, { upsert: true, new: true });
    }
    return NextResponse.json(
      { success: true, message: 'Settings saved successfully', settings: body },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to save settings' },
      { status: 500, headers: corsHeaders }
    );
  }
}
