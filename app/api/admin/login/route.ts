import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'avm-smart-super-secret-key-2024';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Default admin credentials: admin / avmsmart2024
    if ((username === 'admin' || username === 'avmsmart') && (password === 'admin123' || password === 'avmsmart2024')) {
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        token
      });

      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin username or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Authentication processing error' },
      { status: 500 }
    );
  }
}
