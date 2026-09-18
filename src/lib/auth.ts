import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './mongodb';
import Admin from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'avm-smart-production-jwt-secret-key-2024';

export interface AdminPayload {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Safely initializes / seeds the admin account into MongoDB Atlas.
 * Never overwrites existing passwords on restart.
 * Uses environment variables ADMIN_EMAIL and ADMIN_PASSWORD.
 */
export async function seedAdminAccount() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'AVMSmart.admin@gmail.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'AVMSmart@2024#Admin';

  if (!adminEmail || !adminPassword) {
    return null;
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) return null;

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      return existingAdmin;
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const newAdmin = await Admin.create({
      email: adminEmail,
      passwordHash,
      role: 'admin',
    });

    console.log(`[Admin Seed]: Default admin identity seeded in MongoDB for ${adminEmail}`);
    return newAdmin;
  } catch (error: any) {
    console.error('[Admin Seed Error]:', error?.message || 'Failed to seed admin user');
    return null;
  }
}

/**
 * Verifies JWT token from Authorization header or HTTP-only admin_token cookie.
 * Returns decoded AdminPayload if authorized, otherwise null.
 */
export function verifyAdminAuth(req: Request | NextRequest): AdminPayload | null {
  try {
    let token: string | null = null;

    // Check Authorization header
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }

    // Check cookies if header token not found
    if (!token && 'cookies' in req) {
      const cookie = (req as NextRequest).cookies.get('admin_token');
      if (cookie) {
        token = cookie.value;
      }
    }

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    if (decoded && decoded.role === 'admin') {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Generates CORS headers for production domain and local development.
 */
export function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://www.avmsmart.in',
    'https://avmsmart.in',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
  ].filter(Boolean);

  const isAllowed = allowedOrigins.includes(origin);
  const allowOrigin = isAllowed ? origin : (allowedOrigins[0] || '*');

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
  };
}

/**
 * Helper to handle OPTIONS preflight CORS requests.
 */
export function handleCorsPreflight(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(req),
  });
}
