import { NextResponse } from 'next/server';
import { verifyAdminAuth, getCorsHeaders, handleCorsPreflight } from '@/lib/auth';
import { sendCustomClientEmail } from '@/lib/email';

export async function OPTIONS(req: Request) {
  return handleCorsPreflight(req);
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
    const { recipientEmail, recipientName, subject, body: emailBody, service } = body;

    if (!recipientEmail || !subject || !emailBody) {
      return NextResponse.json(
        { success: false, error: 'Recipient email, subject, and body are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await sendCustomClientEmail({
      recipientEmail,
      recipientName: recipientName || 'Valued Client',
      subject,
      body: emailBody,
      service,
    });

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully to client!' },
        { status: 200, headers: corsHeaders }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error || result.warning || 'Failed to dispatch email' },
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error: any) {
    console.error('[Admin Send Email Error]:', error?.message || error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while sending email' },
      { status: 500, headers: corsHeaders }
    );
  }
}
