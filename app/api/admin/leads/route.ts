import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Lead from '@/models/Lead';

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Lead ID and status required' }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (conn) {
      await Lead.findByIdAndUpdate(id, { status });
      return NextResponse.json({ success: true, message: 'Lead status updated' });
    }
    return NextResponse.json({ success: true, message: 'Lead status updated (local mode)' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
