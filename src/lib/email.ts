import nodemailer from 'nodemailer';

export interface LeadEmailData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  company?: string;
  budget?: string;
  timeline?: string;
  message?: string;
}

export async function sendLeadNotificationEmail(data: LeadEmailData) {
  const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || 587);
  const smtpUser =
    process.env.SMTP_USER ||
    process.env.EMAIL_SERVER_USER ||
    process.env.ADMIN_EMAIL ||
    'avmsmart.official@gmail.com';
  const smtpPass =
    process.env.SMTP_PASS ||
    process.env.EMAIL_SERVER_PASSWORD ||
    process.env.SMTP_PASSWORD;

  const recipientEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    'avmsmart.official@gmail.com';

  console.log(
    `[Lead Notification Email]: Preparing email for new lead from "${data.fullName}" (${data.email}) to "${recipientEmail}"`
  );

  if (!smtpPass) {
    console.warn(
      `[Lead Notification Email Warning]: SMTP_PASS / EMAIL_SERVER_PASSWORD is not set in environment variables. Email notification was logged.`
    );
    return {
      success: false,
      warning: 'SMTP_PASS environment variable is missing',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"AVM Smart Leads" <${smtpUser}>`,
      to: recipientEmail,
      subject: `🚨 You got one new lead regarding ${data.service}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="background-color: #0B2A5B; padding: 18px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800;">You got one new lead regarding this!</h2>
            <p style="color: #67D63B; margin: 6px 0 0 0; font-size: 14px; font-weight: bold;">Service: ${data.service}</p>
          </div>

          <div style="padding: 24px; color: #334155;">
            <p style="font-size: 15px; font-weight: bold; margin-top: 0;">New Inquiry Details:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px; color: #64748b;">Full Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0f172a;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Email Address:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #087FF5; font-weight: bold;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Phone Number:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><a href="tel:${data.phone}" style="color: #087FF5; font-weight: bold;">${data.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Requested Service:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0B2A5B;">${data.service}</td>
              </tr>
              ${
                data.company
                  ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Company:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.company}</td>
              </tr>`
                  : ''
              }
              ${
                data.budget
                  ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Budget:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.budget}</td>
              </tr>`
                  : ''
              }
              ${
                data.message
                  ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Message / Notes:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${data.message}</td>
              </tr>`
                  : ''
              }
            </table>

            <div style="margin-top: 28px; text-align: center;">
              <a href="https://www.avmsmart.in/admin/leads" style="background-color: #087FF5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
                Manage Lead in Admin Dashboard →
              </a>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 14px; text-align: center; border-radius: 0 0 8px 8px; font-size: 11px; color: #94a3b8;">
            AVM Smart Solutions Automated Lead Notification Engine
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      `[Lead Notification Email Success]: Email dispatched successfully. Message ID: ${info.messageId}`
    );
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Lead Notification Email Error]:`, error?.message || error);
    return { success: false, error: error?.message || 'Email delivery failed' };
  }
}

export interface CustomClientEmailData {
  recipientEmail: string;
  recipientName: string;
  subject: string;
  body: string;
  service?: string;
}

export async function sendCustomClientEmail(data: CustomClientEmailData) {
  const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || 587);
  const smtpUser =
    process.env.SMTP_USER ||
    process.env.EMAIL_SERVER_USER ||
    process.env.ADMIN_EMAIL ||
    'avmsmart.official@gmail.com';
  const smtpPass =
    process.env.SMTP_PASS ||
    process.env.EMAIL_SERVER_PASSWORD ||
    process.env.SMTP_PASSWORD;

  if (!smtpPass) {
    console.warn(`[Custom Client Email Warning]: SMTP_PASS is missing.`);
    return { success: false, warning: 'SMTP_PASS environment variable is missing' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const formattedBody = data.body.replace(/\n/g, '<br/>');

    const mailOptions = {
      from: `"AVM Smart Solutions" <${smtpUser}>`,
      to: data.recipientEmail,
      subject: data.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="background-color: #0B2A5B; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800;">AVM Smart Solutions</h2>
            <p style="color: #087FF5; margin: 4px 0 0 0; font-size: 13px; font-weight: bold;">Web, App & Digital Solutions</p>
          </div>

          <div style="padding: 24px; color: #334155; font-size: 14px; leading-height: 1.6;">
            <p style="font-weight: bold; font-size: 16px; color: #0B2A5B; margin-top: 0;">Dear ${data.recipientName},</p>
            
            <div style="margin: 16px 0; line-height: 1.6; color: #1e293b;">
              ${formattedBody}
            </div>

            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />

            <p style="margin: 0; font-weight: bold; color: #0B2A5B;">Warm regards,</p>
            <p style="margin: 4px 0 0 0; font-weight: bold; color: #087FF5;">AVM Smart Solutions Team</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748b;">Website: <a href="https://avmsmart.in" style="color: #087FF5;">www.avmsmart.in</a> | Phone: +91-8978040537</p>
          </div>

          <div style="background-color: #f8fafc; padding: 14px; text-align: center; border-radius: 0 0 10px 10px; font-size: 11px; color: #94a3b8;">
            © ${new Date().getFullYear()} AVM Smart Solutions. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Custom Client Email Error]:`, error?.message || error);
    return { success: false, error: error?.message || 'Failed to send client email' };
  }
}
