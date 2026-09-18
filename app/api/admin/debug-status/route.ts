import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { seedAdminAccount, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

export async function GET(req: Request) {
  const corsHeaders = getCorsHeaders(req);
  let dbConnected = false;
  let adminExists = false;
  let totalAdmins = 0;

  try {
    const conn = await connectToDatabase();
    if (conn && mongoose.connection.readyState === 1) {
      dbConnected = true;
      
      // Auto-seed if missing
      await seedAdminAccount();
      
      totalAdmins = await Admin.countDocuments();
      adminExists = totalAdmins > 0;
    }
  } catch (error) {
    dbConnected = false;
  }

  return NextResponse.json(
    {
      success: true,
      dbConnected,
      adminExists,
      totalAdmins,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
