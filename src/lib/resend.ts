import { Resend } from 'resend';

export interface CustomerEmailPayload {
  customerName: string;
  customerEmail: string;
  phone?: string;
  service?: string;
  message?: string;
  submittedAt?: string;
  couponCode?: string;
  influencerName?: string;
  packagePrice?: number;
  discountAmount?: number;
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
  const { customerName, customerEmail, phone, service, message, submittedAt, couponCode, influencerName, packagePrice, discountAmount } = payload;

  console.log(`[Resend Team Email]: Dispatching lead notification for ${customerName} to ${teamEmail}`);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [teamEmail],
      subject: `New Contact Form Enquiry – ${customerName}${couponCode ? ` (Referral: ${couponCode})` : ''}`,
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
              ${
                couponCode
                  ? `
              <tr style="background-color: #fefce8;">
                <td style="padding: 10px; border-bottom: 1px solid #fef08a; font-weight: 800; color: #854d0e;">Coupon Applied:</td>
                <td style="padding: 10px; border-bottom: 1px solid #fef08a; font-weight: 800; color: #a16207;">
                  <span style="background-color: #fde047; padding: 4px 10px; border-radius: 6px; font-family: monospace;">${couponCode}</span>
                  ${influencerName ? `<span style="margin-left: 8px; color: #713f12; font-size: 13px;">(Influencer: ${influencerName})</span>` : ''}
                </td>
              </tr>
              <tr style="background-color: #fefce8;">
                <td style="padding: 10px; border-bottom: 1px solid #fef08a; font-weight: 800; color: #854d0e;">Package & Discount:</td>
                <td style="padding: 10px; border-bottom: 1px solid #fef08a; font-weight: 700; color: #15803d;">
                  Offer Price: ₹${packagePrice || 3999} (Regular ₹4,999 — Discount: ₹${discountAmount || 1000})
                </td>
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

            <div style="margin-top: 24px; padding: 16px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; text-align: center; color: #0369a1; font-weight: 700; font-size: 13px;">
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
  } catch (error: unknown) {
    const errObj = error as { message?: string };
    console.error(`[Resend Team Email Error]:`, errObj?.message || error);
    return { success: false, error: errObj?.message || 'Failed to send team notification email' };
  }
}

export interface InfluencerWelcomePayload {
  partnerName?: string;
  partnerEmail?: string;
  partnerType?: 'individual' | 'influencer';
  influencerName?: string;
  couponCode: string;
  socialAccounts?: { platform: string; url: string }[];
  platform?: string;
  termsUrl?: string;
  websiteUrl?: string;
  // Backward compatibility aliases
  influencerEmail?: string;
}

/**
 * Sends welcome & coupon code notification email to newly registered referral partner (Individual or Influencer).
 */
export async function sendInfluencerWelcomeEmail(payload: InfluencerWelcomePayload) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, warning: 'RESEND_API_KEY is missing' };
  }

  const fromEmail = process.env.EMAIL_FROM || 'AVM Smart Solutions <no-reply@avmsmart.in>';
  const partnerName = payload.partnerName || (payload as any).influencerName || 'Valued Partner';
  const partnerEmail = payload.partnerEmail || payload.influencerEmail || '';
  const partnerType = payload.partnerType || 'individual';
  const influencerAccountName = payload.influencerName || '';
  const couponCode = payload.couponCode;
  const siteUrl = payload.websiteUrl || 'https://www.avmsmart.in';
  const termsUrl = payload.termsUrl || `${siteUrl}/influencer-terms`;

  console.log(`[Resend Partner Email]: Dispatching 6-char coupon code to ${partnerEmail} (${couponCode}) [${partnerType}]`);

  const isInfluencer = partnerType === 'influencer';
  const subject = isInfluencer
    ? `Welcome to the AVM Smart Influencer Program — Your Coupon Code: ${couponCode}`
    : `Welcome to the AVM Smart Referral Partner Program — Your Coupon Code: ${couponCode}`;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [partnerEmail],
      subject,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0B0B0B 0%, #1A1A1A 100%); padding: 32px 24px; border-radius: 14px; text-align: center; border-bottom: 4px solid #FFD600;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">AVM Smart Solutions</h1>
            <p style="color: #FFD600; margin: 6px 0 0 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
              ${isInfluencer ? 'Influencer Partner Program' : 'Referral Partner Program'}
            </p>
          </div>

          <!-- Body Content -->
          <div style="padding: 28px 8px; font-size: 15px; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 17px;">Dear <strong>${partnerName}</strong>${isInfluencer && influencerAccountName ? ` (${influencerAccountName})` : ''},</p>

            <p style="color: #334155;">
              Welcome to the <strong>AVM Smart Solutions Referral Program</strong>! We are delighted to have you as an authorized partner. You can now refer clients to our digital services and help them save money while earning commissions.
            </p>

            <!-- Exclusive 6-Character Coupon Highlight Box -->
            <div style="background: #FFFDF0; border: 2px dashed #FFD600; border-radius: 14px; padding: 24px; margin: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 12px; font-weight: 800; color: #854d0e; text-transform: uppercase; letter-spacing: 1px;">Your Unique 6-Character Referral Coupon Code</p>
              <div style="margin: 12px 0; font-size: 34px; font-weight: 900; letter-spacing: 4px; color: #0B0B0B; font-family: monospace; background: #FFD600; padding: 10px 24px; border-radius: 8px; display: inline-block;">
                ${couponCode}
              </div>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #713f12; font-weight: 600;">
                Share this coupon code with anyone planning to build a website or digital presence!
              </p>
            </div>

            <!-- Pricing Offer Details -->
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <h3 style="margin-top: 0; font-size: 15px; color: #0F172A; font-weight: 800;">Offer Inclusions for Your Referred Customers:</h3>
              <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.8;">
                <li><strong>Regular Website Package Price:</strong> <span style="text-decoration: line-through; color: #64748b;">₹4,999</span></li>
                <li><strong>Special Offer Price:</strong> <span style="color: #16A34A; font-weight: 800; font-size: 16px;">₹3,999</span></li>
                <li><strong>Total Customer Savings:</strong> <strong style="color: #087FF5;">₹1,000 Flat Discount</strong> with code <strong>${couponCode}</strong></li>
                <li><strong>Package Inclusions:</strong> Full custom responsive website, contact enquiry forms, basic SEO setup, domain integration, & dedicated support.</li>
              </ul>
            </div>

            <!-- Commission & Takeover Conditions -->
            <div style="background: #F0FDF4; border-left: 4px solid #16A34A; padding: 16px 20px; border-radius: 0 10px 10px 0; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 14px; font-weight: 800;">Commission & Payout Policy:</h4>
              <p style="margin: 0; font-size: 13px; color: #14532D; line-height: 1.5;">
                Commissions are credited on qualifying successful conversions. Eligibility requires that the referred client completes project onboarding, payment requirements are met, and the project is officially taken over and begun by the AVM Smart Solutions engineering team.
              </p>
            </div>

            ${
              isInfluencer && payload.socialAccounts && payload.socialAccounts.length > 0
                ? `
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 13px;">
              <strong>Registered Channels:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 18px; color: #475569;">
                ${payload.socialAccounts.map((acc) => `<li>${acc.platform}: <a href="${acc.url}" style="color: #087FF5;">${acc.url}</a></li>`).join('')}
              </ul>
            </div>`
                : ''
            }

            <!-- Useful Links & CTAs -->
            <div style="text-align: center; margin: 30px 0 20px 0;">
              <a href="${siteUrl}/contact" style="background: #0B0B0B; color: #FFD600; padding: 12px 24px; border-radius: 10px; font-weight: 800; text-decoration: none; font-size: 14px; display: inline-block; margin-right: 8px;">
                Visit Website Contact Page
              </a>
              <a href="${termsUrl}" style="background: #F1F5F9; color: #334155; padding: 12px 20px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 14px; display: inline-block;">
                Review Referral Terms
              </a>
            </div>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-weight: 700; color: #0B2A5B;">Warm regards,</p>
              <p style="margin: 4px 0 0 0; font-weight: 800; color: #087FF5; font-size: 16px;">AVM Smart Solutions Team</p>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b;">
                Partner Support: <a href="mailto:AVMSmart.official@gmail.com" style="color: #087FF5; text-decoration: none; font-weight: 600;">AVMSmart.official@gmail.com</a>
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 12px; font-size: 12px; color: #94a3b8;">
            © ${new Date().getFullYear()} AVM Smart Solutions. All rights reserved.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error(`[Resend Partner Email Error]:`, error.message);
      return { success: false, error: error.message };
    }

    if (!data) {
      console.error(`[Resend Partner Email Error]: No data returned from Resend API`);
      return { success: false, error: 'No data returned from Resend API' };
    }

    console.log(`[Resend Partner Email Success]: Email ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (error: unknown) {
    const errObj = error as { message?: string };
    console.error(`[Resend Partner Email Error]:`, errObj?.message || error);
    return { success: false, error: errObj?.message || 'Failed to dispatch partner email' };
  }
}

export interface CommissionNotificationPayload {
  partnerName: string;
  partnerEmail: string;
  clientName: string;
  projectName?: string;
  finalProjectAmount: number;
  commissionRate?: number;
  commissionAmount: number;
  commissionStatus?: string;
}

/**
 * Sends exactly one commission notification email to the referral partner upon project conversion.
 */
export async function sendCommissionNotificationEmail(payload: CommissionNotificationPayload) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, warning: 'RESEND_API_KEY is missing' };
  }

  const fromEmail = process.env.EMAIL_FROM || 'AVM Smart Solutions <no-reply@avmsmart.in>';
  const {
    partnerName,
    partnerEmail,
    clientName,
    projectName = 'Custom Development Project',
    finalProjectAmount,
    commissionRate = 10,
    commissionAmount,
    commissionStatus = 'Pending Qualification',
  } = payload;

  console.log(`[Resend Commission Email]: Dispatching conversion alert to ${partnerEmail} for client ${clientName}`);

  const formattedProjectAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalProjectAmount);
  const formattedCommission = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(commissionAmount);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [partnerEmail],
      subject: `AVM Smart — Your Referral Has Converted!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <!-- Header Banner -->
          <div style="background-color: #0B2A5B; padding: 24px; border-radius: 12px; text-align: center;">
            <span style="background-color: #FFD600; color: #0B0B0B; font-size: 11px; font-weight: 900; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 8px;">
              Referral Converted
            </span>
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800;">Congratulations, ${partnerName}!</h2>
            <p style="color: #93c5fd; margin: 6px 0 0 0; font-size: 13px;">Your referred client has successfully signed up with AVM Smart Solutions.</p>
          </div>

          <!-- Body -->
          <div style="padding: 24px 8px; font-size: 14px; line-height: 1.6;">
            <p style="margin-top: 0; color: #334155;">Hello <strong>${partnerName}</strong>,</p>
            <p style="color: #334155;">
              Good news! Your referred client, <strong>${clientName}</strong>, has successfully converted their project with AVM Smart Solutions.
            </p>

            <!-- Project & Commission Details Table -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 160px;">Client:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${clientName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Project:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${projectName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Final Project Amount:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${formattedProjectAmount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Commission Rate:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${commissionRate}%</td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0 8px 0; color: #166534; font-weight: 800; font-size: 15px;">Your Commission:</td>
                  <td style="padding: 12px 0 8px 0; color: #166534; font-weight: 900; font-size: 18px;">${formattedCommission}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Commission Status:</td>
                  <td style="padding: 8px 0; color: #087FF5; font-weight: 700;">${commissionStatus}</td>
                </tr>
              </table>
            </div>

            <!-- Program Policy Note -->
            <div style="background-color: #FEF3C7; border: 1px solid #FDE68A; border-radius: 12px; padding: 14px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 12px; color: #92400E; line-height: 1.5;">
                <strong>Payout Policy:</strong> Your commission will be processed according to the AVM Smart referral program terms, after the applicable project-takeover and customer-payment conditions are satisfied.
              </p>
            </div>

            <p style="color: #334155; margin-bottom: 24px;">Thank you for referring customers to AVM Smart Solutions.</p>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-weight: 700; color: #0B2A5B;">Warm regards,</p>
              <p style="margin: 4px 0 0 0; font-weight: 800; color: #087FF5; font-size: 16px;">AVM Smart Solutions</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 12px; font-size: 12px; color: #94a3b8;">
            © ${new Date().getFullYear()} AVM Smart Solutions. All rights reserved.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error(`[Resend Commission Email Error]:`, error.message);
      return { success: false, error: error.message };
    }

    if (!data) {
      console.error(`[Resend Commission Email Error]: No data returned from Resend API`);
      return { success: false, error: 'No data returned from Resend API' };
    }

    console.log(`[Resend Commission Email Success]: Email ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (error: unknown) {
    const errObj = error as { message?: string };
    console.error(`[Resend Commission Email Error]:`, errObj?.message || error);
    return { success: false, error: errObj?.message || 'Failed to dispatch commission email' };
  }
}


