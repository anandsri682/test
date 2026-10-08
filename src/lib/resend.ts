import { Resend } from 'resend';

export interface CustomerEmailPayload {
  customerName: string;
  customerEmail: string;
  phone?: string;
  service?: string;
  message?: string;
  submittedAt?: string;
}

/**
 * Lazy initialization of Resend client to prevent server initialization errors
 * when RESEND_API_KEY is not yet configured in environment variables.
 */
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    console.warn(
      '[Resend Email Warning]: RESEND_API_KEY is not set in backend environment variables.'
    );
    return null;
  }
  return new Resend(apiKey.trim());
}

/**
 * STEP 5 — Sends confirmation email to the customer using Resend.
 */
export async function sendCustomerConfirmationEmail(payload: CustomerEmailPayload) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, warning: 'RESEND_API_KEY is missing' };
  }

  const fromEmail = process.env.EMAIL_FROM || 'AVM Smart Solutions <no-reply@avmsmart.in>';
  const { customerName, customerEmail } = payload;

  console.log(`[Resend Customer Email]: Dispatching confirmation email to ${customerEmail}`);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [customerEmail],
      subject: 'Thank you for contacting AVM Smart Solutions',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <div style="background: linear-gradient(135deg, #0B2A5B 0%, #087FF5 100%); padding: 28px 24px; border-radius: 12px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; tracking-tight: -0.5px;">AVM Smart Solutions</h1>
            <p style="color: #67D63B; margin: 6px 0 0 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Enquiry Received</p>
          </div>

          <div style="padding: 28px 8px; font-size: 15px; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 16px;">Hi <strong>${customerName}</strong>,</p>

            <p style="color: #334155;">Thank you for contacting <strong>AVM Smart Solutions</strong>.</p>
            <p style="color: #334155;">We have successfully received your enquiry.</p>
            <p style="color: #334155;">Our team will review your requirements and get back to you very soon.</p>
            <p style="color: #334155;">If you have any additional information or requirements, feel free to reply to this email.</p>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-weight: 700; color: #0B2A5B;">Best regards,</p>
              <p style="margin: 4px 0 0 0; font-weight: 800; color: #087FF5; font-size: 16px;">AVM Smart Solutions</p>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b;">
                Website: <a href="https://avmsmart.in/" style="color: #087FF5; text-decoration: none; font-weight: 600;">https://avmsmart.in/</a>
              </p>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 12px; font-size: 12px; color: #94a3b8;">
            © ${new Date().getFullYear()} AVM Smart Solutions. All rights reserved.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error(`[Resend Customer Email Error]:`, error.message);
      return { success: false, error: error.message };
    }

    if (!data) {
      console.error(`[Resend Customer Email Error]: No data returned from Resend API`);
      return { success: false, error: 'No data returned from Resend API' };
    }

    console.log(`[Resend Customer Email Success]: Email ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error(`[Resend Customer Email Error]:`, error?.message || error);
    return { success: false, error: error?.message || 'Failed to send customer confirmation email' };
  }
}

/**
 * STEP 6 — Sends internal notification email to the team using Resend.
 */
export async function sendTeamNotificationEmail(payload: CustomerEmailPayload) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, warning: 'RESEND_API_KEY is missing' };
  }

  const fromEmail = process.env.EMAIL_FROM || 'AVM Smart Solutions <no-reply@avmsmart.in>';
  const teamEmail = process.env.CONTACT_EMAIL || 'avmsmart.official@gmail.com';
  const { customerName, customerEmail, phone, service, message, submittedAt } = payload;

  console.log(`[Resend Team Email]: Dispatching lead notification for ${customerName} to ${teamEmail}`);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [teamEmail],
      subject: `New Contact Form Enquiry – ${customerName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <div style="background-color: #0B2A5B; padding: 20px 24px; border-radius: 12px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800;">New Customer Enquiry Received</h2>
            <p style="color: #67D63B; margin: 4px 0 0 0; font-size: 13px; font-weight: 700;">AVM Smart Solutions Website Contact Form</p>
          </div>

          <div style="padding: 24px 8px; font-size: 14px; line-height: 1.6;">
            <p style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 0;">Customer Details:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; width: 140px; color: #64748b;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0f172a;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${customerEmail}" style="color: #087FF5; font-weight: 700; text-decoration: none;">${customerEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone || ''}" style="color: #087FF5; font-weight: 700; text-decoration: none;">${phone || 'N/A'}</a></td>
              </tr>
              ${
                service
                  ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b;">Service:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0B2A5B;">${service}</td>
              </tr>`
                  : ''
              }
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b;">Message:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;">${message || 'No additional text specified.'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b;">Submission Date/Time:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;">${submittedAt || new Date().toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b;">Source:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #087FF5;">AVM Smart Solutions Website Contact Form</td>
              </tr>
            </table>

            <div style="margin-top: 24px; p: 16px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; text-align: center; color: #0369a1; font-weight: 700; font-size: 13px;">
              ⚡ Please contact the customer as soon as possible.
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 14px; text-align: center; border-radius: 12px; font-size: 12px; color: #94a3b8;">
            AVM Smart Solutions Automated Resend Lead Engine
          </div>
        </div>
      `,
    });

    if (error) {
      console.error(`[Resend Team Email Error]:`, error.message);
      return { success: false, error: error.message };
    }

    if (!data) {
      console.error(`[Resend Team Email Error]: No data returned from Resend API`);
      return { success: false, error: 'No data returned from Resend API' };
    }

    console.log(`[Resend Team Email Success]: Email ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (error: any) {
    console.error(`[Resend Team Email Error]:`, error?.message || error);
    return { success: false, error: error?.message || 'Failed to send team notification email' };
  }
}
