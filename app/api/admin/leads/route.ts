import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import Lead from '@/models/Lead';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

export async function PATCH(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  const authUser = verifyAdminAuth(req);
  if (!authUser) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required' },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Lead/Contact ID and status are required' },
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

    // Update in Contact model
    const updatedContact = await Contact.findByIdAndUpdate(id, { status }, { new: true });

    // Also update in Lead model if exists
    try {
      await Lead.findByIdAndUpdate(id, { status });
    } catch {}

    return NextResponse.json(
      {
        success: true,
        message: 'Lead status updated successfully',
        lead: updatedContact,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to update lead status' },
      { status: 500, headers: corsHeaders }
    );
  }
}
