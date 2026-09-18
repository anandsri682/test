import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import { getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  let dbStatus = 'disconnected';

  try {
    const conn = await connectToDatabase();
    if (conn && mongoose.connection.readyState === 1) {
      dbStatus = 'connected';
    }
  } catch {
    dbStatus = 'error';
  }

  return NextResponse.json(
    {
      status: 'ok',
      service: 'AVM Smart Backend',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
