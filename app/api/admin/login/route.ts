import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { seedAdminAccount, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'avm-smart-production-jwt-secret-key-2024';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const body = await req.json();
    const rawUsername = body?.username || body?.email || '';
    const rawPassword = body?.password || '';

    if (!rawUsername || !rawPassword) {
      return NextResponse.json(
        { success: false, error: 'Username/Email and Password are required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const conn = await connectToDatabase();
    if (!conn) {
      console.error('[Admin Login Failed]: Database connection failed.');
      return NextResponse.json(
        { success: false, error: 'Database service unavailable. Please check MONGODB_URI.' },
        { status: 503, headers: corsHeaders }
      );
    }

    // Ensure admin user exists in DB
    await seedAdminAccount();

    const targetEmail = (process.env.ADMIN_EMAIL || 'avmsmart.admin@gmail.com').toLowerCase().trim();
    const inputIdentifier = rawUsername.trim().toLowerCase();

    console.log(`[Admin Login Attempt]: Identifier "${inputIdentifier}"`);

    // Case-insensitive query by email
    let admin = await Admin.findOne({
      email: { $regex: new RegExp('^' + inputIdentifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') }
    });

    // Fallback: If user entered 'admin' or 'avmsmart', look for the configured admin email
    if (!admin && (inputIdentifier === 'admin' || inputIdentifier === 'avmsmart')) {
      admin = await Admin.findOne({
        email: { $regex: new RegExp('^' + targetEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') }
      });
    }

    // If still not found, try finding ANY admin account in DB
    if (!admin) {
      admin = await Admin.findOne({});
    }

    if (!admin) {
      console.warn(`[Admin Login Failed]: No admin document found matching "${inputIdentifier}".`);
      return NextResponse.json(
        { success: false, error: 'Invalid admin username or password' },
        { status: 401, headers: corsHeaders }
      );
    }

    const isMatch = await bcrypt.compare(rawPassword, admin.passwordHash);
    if (!isMatch) {
      console.warn(`[Admin Login Failed]: Password mismatch for admin "${admin.email}".`);
      return NextResponse.json(
        { success: false, error: 'Invalid admin username or password' },
        { status: 401, headers: corsHeaders }
      );
    }

    console.log(`[Admin Login Success]: Admin "${admin.email}" authenticated.`);

    const token = jwt.sign(
      { email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: 'Admin authentication successful',
        token,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('[Admin Login Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: 'Authentication processing error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
