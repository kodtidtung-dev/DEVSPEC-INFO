/**
 * Contact API Route
 * Handles contact form submissions with validation and email sending
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/specs/001-modern-portfolio/contracts/data-schemas';
import { checkRateLimit } from '@/lib/rateLimiter';
import { ZodError } from 'zod';

// Initialize Resend (lazy initialization to prevent build errors)
let resend: Resend | null = null;
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Get contact email from environment
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'your@email.com';

// Rate limit settings
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '3', 10);
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000', 10);

// Minimum submission time (bot detection)
const MIN_SUBMISSION_TIME = 3000; // 3 seconds

/**
 * Get client identifier for rate limiting
 * Uses IP address or falls back to a default for local development
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback for local development
  return 'local-dev';
}

/**
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Check honeypot field
    if (body.honeypot && body.honeypot.length > 0) {
      console.warn('Honeypot triggered:', { honeypot: body.honeypot });
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Check submission timing (bot detection)
    if (body.timestamp && body.timestamp < MIN_SUBMISSION_TIME) {
      console.warn('Submission too fast:', { timestamp: body.timestamp });
      return NextResponse.json(
        { success: false, error: 'Submission too fast. Please try again.' },
        { status: 400 }
      );
    }

    // Get client identifier for rate limiting
    const clientId = getClientIdentifier(request);

    // Check rate limit
    const rateLimitInfo = checkRateLimit(clientId, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

    if (!rateLimitInfo.allowed) {
      console.warn('Rate limit exceeded:', { clientId, retryAfter: rateLimitInfo.retryAfter });
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again in ${rateLimitInfo.retryAfter} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitInfo.retryAfter?.toString() || '3600',
            'X-RateLimit-Remaining': rateLimitInfo.remaining.toString(),
          },
        }
      );
    }

    // Validate form data with Zod schema
    const validatedData = contactFormSchema.parse(body);

    // Get Resend instance
    const resendInstance = getResend();
    if (!resendInstance) {
      console.error('Resend not initialized - API key missing');
      // In development, log the message instead of failing
      if (process.env.NODE_ENV === 'development') {
        console.log('Contact form submission (dev mode):', validatedData);
        return NextResponse.json({
          success: true,
          message: 'Message received (development mode - email not sent)',
        });
      }
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const emailResult = await resendInstance.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use verified domain in production
      to: CONTACT_EMAIL,
      replyTo: validatedData.email,
      subject: `Portfolio Contact from ${validatedData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF3333 0%, #FF5555 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #666; font-size: 14px; text-transform: uppercase; }
              .value { margin-top: 5px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #FF3333; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee; font-size: 12px; color: #999; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new message from your portfolio</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${validatedData.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${validatedData.email}" style="color: #FF3333; text-decoration: none;">${validatedData.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${validatedData.message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>Sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
                  <p>Reply directly to this email to respond to ${validatedData.name}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}

---
Sent from your portfolio contact form at ${new Date().toLocaleString()}
      `.trim(),
    });

    // Check if email was sent successfully
    if (emailResult.error) {
      console.error('Failed to send email:', emailResult.error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Log success (in production, consider using proper logging service)
    console.log('Contact form submitted successfully:', {
      name: validatedData.name,
      email: validatedData.email,
      messageId: emailResult.data?.id,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        messageId: emailResult.data?.id,
      },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimitInfo.remaining.toString(),
        },
      }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      console.warn('Validation error:', zodError.issues);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          errors: zodError.issues.reduce(
            (acc, err) => {
              const field = err.path.join('.');
              acc[field] = acc[field] || [];
              acc[field].push(err.message);
              return acc;
            },
            {} as Record<string, string[]>
          ),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight (if needed)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
