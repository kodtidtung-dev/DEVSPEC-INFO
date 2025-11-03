# API Routes Contract

**Feature**: Modern Frontend Developer Portfolio
**Date**: 2025-10-30
**Purpose**: Define API endpoints, request/response formats, and behavior

## Overview

This portfolio application has minimal API surface area, consisting of a single serverless API route for contact form submissions. The route is implemented as a Next.js API Route Handler in the App Router.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://yourdomain.com/api`

## Authentication

No authentication required. Spam protection implemented via:
- Honeypot fields
- Rate limiting (IP-based)
- Input validation

## Endpoints

### POST /api/contact

Handles contact form submissions and sends email notifications.

#### Endpoint Details

- **Method**: POST
- **Path**: `/api/contact`
- **Content-Type**: `application/json`
- **Rate Limit**: 3 requests per IP per hour
- **Timeout**: 10 seconds

#### Request Schema

```typescript
{
  name: string      // Required, min 2 chars, max 100 chars
  email: string     // Required, valid email format, max 255 chars
  message: string   // Required, min 10 chars, max 5000 chars
  honeypot?: string // Optional hidden field, must be empty
}
```

#### Request Example

```json
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "message": "Hi, I came across your portfolio and I'm impressed with your work. We have an opening for a Senior Frontend Developer at TechCorp. Would you be interested in discussing this opportunity?"
}
```

#### Success Response

**Status Code**: `200 OK`

```typescript
{
  success: true
  message?: string // Optional success message
}
```

**Example**:
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon."
}
```

#### Error Responses

**400 Bad Request** - Validation Error

```typescript
{
  success: false
  error: string          // Human-readable error message
  field?: string         // Field that caused the error
  errors?: {            // Detailed validation errors
    [field: string]: string[]
  }
}
```

**Example - Invalid Email**:
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["Invalid email address"]
  }
}
```

**Example - Honeypot Triggered**:
```json
{
  "success": false,
  "error": "Invalid submission"
}
```

**429 Too Many Requests** - Rate Limit Exceeded

```typescript
{
  success: false
  error: string
  retryAfter: number  // Seconds until retry allowed
}
```

**Example**:
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "retryAfter": 3600
}
```

**500 Internal Server Error** - Server/Email Service Error

```typescript
{
  success: false
  error: string
}
```

**Example**:
```json
{
  "success": false,
  "error": "Failed to send message. Please try again later."
}
```

#### Validation Rules

**name**:
- Required
- String type
- Minimum length: 2 characters
- Maximum length: 100 characters
- Trimmed before validation
- Must not contain only whitespace

**email**:
- Required
- String type
- Valid email format (RFC 5322 compliant)
- Maximum length: 255 characters
- Trimmed and lowercased before validation
- Common typos detected and rejected (e.g., @gmial.com)

**message**:
- Required
- String type
- Minimum length: 10 characters
- Maximum length: 5000 characters
- Trimmed before validation
- Must not contain only whitespace
- HTML/script tags stripped (XSS protection)

**honeypot**:
- Optional field
- Must be empty string or undefined
- If filled, request is rejected as spam
- Field name can be randomized for security

#### Rate Limiting Strategy

**Implementation**: IP-based rate limiting using Vercel KV (Redis)

**Limits**:
- **Per IP**: 3 requests per hour
- **Global**: 1000 requests per hour (prevent DoS)

**Algorithm**: Token bucket

**Headers Included**:
```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 1699564800
```

**Bypass**: None (applies to all requests)

#### Email Delivery

**Service**: Resend (or SendGrid as alternative)

**Email Template**:
```
From: portfolio@yourdomain.com
To: your@email.com
Subject: Portfolio Contact from [Name]

---

New contact form submission:

From: [Name]
Email: [Email]
Received: [Timestamp]

Message:
[Message]

---

Reply to this email to respond directly to the sender.
```

**Delivery Behavior**:
- Synchronous: Wait for email service response before returning
- Timeout: 10 seconds
- Retry: No automatic retries (user can resubmit if needed)
- Failure: Return 500 error to client

#### Security Measures

1. **Input Sanitization**:
   - HTML/script tag stripping
   - SQL injection prevention (not applicable, no database)
   - XSS prevention

2. **Honeypot**:
   - Hidden field in form (`website` or randomized name)
   - CSS-based hiding (not `display: none`)
   - Server rejects if filled

3. **Rate Limiting**:
   - IP-based tracking
   - Token bucket algorithm
   - Clear error messages

4. **CORS**:
   - Same-origin only
   - No external API access needed

5. **Content Security Policy**:
   ```
   Content-Security-Policy: default-src 'self'
   ```

#### Implementation Reference

**File Location**: `src/app/api/contact/route.ts`

**Pseudocode**:
```typescript
export async function POST(request: Request) {
  // 1. Parse and validate input
  const body = await request.json()
  const validation = contactFormSchema.safeParse(body)

  if (!validation.success) {
    return Response.json({
      success: false,
      error: 'Validation failed',
      errors: validation.error.flatten().fieldErrors
    }, { status: 400 })
  }

  const { name, email, message, honeypot } = validation.data

  // 2. Honeypot check
  if (honeypot && honeypot.trim() !== '') {
    return Response.json({
      success: false,
      error: 'Invalid submission'
    }, { status: 400 })
  }

  // 3. Rate limiting check
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const rateLimitResult = await checkRateLimit(ip)

  if (!rateLimitResult.allowed) {
    return Response.json({
      success: false,
      error: 'Too many requests. Please try again later.',
      retryAfter: rateLimitResult.retryAfter
    }, { status: 429 })
  }

  // 4. Sanitize input
  const sanitizedMessage = sanitizeHtml(message)

  // 5. Send email
  try {
    const { data, error } = await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: process.env.CONTACT_EMAIL!,
      subject: `Portfolio Contact from ${name}`,
      html: generateEmailTemplate({ name, email, message: sanitizedMessage })
    })

    if (error) {
      throw new Error(error.message)
    }

    // 6. Increment rate limit counter
    await incrementRateLimit(ip)

    return Response.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    })
  } catch (error) {
    console.error('Email send error:', error)
    return Response.json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    }, { status: 500 })
  }
}
```

## Environment Variables Required

```bash
# Required
RESEND_API_KEY=re_xxxxxxxxxxxx              # Resend API key
CONTACT_EMAIL=your@email.com                # Your email address

# Optional
KV_REST_API_URL=https://xxx.upstash.io     # Vercel KV for rate limiting
KV_REST_API_TOKEN=xxxxxxxxxxxx              # Vercel KV auth token
```

## Testing Strategy

### Unit Tests

Test validation logic, sanitization, and error handling:

```typescript
describe('POST /api/contact', () => {
  it('should accept valid submission', async () => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Hello, this is a test message.'
      })
    })

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
  })

  it('should reject invalid email', async () => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'invalid-email',
        message: 'Hello world'
      })
    })

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.success).toBe(false)
    expect(data.errors.email).toBeDefined()
  })

  it('should reject spam (honeypot)', async () => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spammer',
        email: 'spam@example.com',
        message: 'Spam message',
        honeypot: 'filled-by-bot'
      })
    })

    expect(response.status).toBe(400)
  })

  it('should enforce rate limiting', async () => {
    // Send 3 valid requests
    for (let i = 0; i < 3; i++) {
      await fetch('/api/contact', { method: 'POST', ... })
    }

    // 4th request should be rate limited
    const response = await fetch('/api/contact', { method: 'POST', ... })
    expect(response.status).toBe(429)
  })
})
```

### Integration Tests

Test full flow including email service:

```typescript
describe('Contact form integration', () => {
  it('should send email successfully', async () => {
    const mockSend = jest.spyOn(resend.emails, 'send')
    mockSend.mockResolvedValue({ data: { id: 'msg_123' }, error: null })

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validContactData)
    })

    expect(response.status).toBe(200)
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'portfolio@yourdomain.com',
        to: process.env.CONTACT_EMAIL,
      })
    )
  })
})
```

### E2E Tests

Test via frontend form submission:

```typescript
// Playwright test
test('contact form submission', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Contact')

  await page.fill('[name="name"]', 'Jane Smith')
  await page.fill('[name="email"]', 'jane@example.com')
  await page.fill('[name="message"]', 'Hello, this is a test message.')

  await page.click('button[type="submit"]')

  // Wait for success message
  await expect(page.locator('.success-message')).toBeVisible()
  await expect(page.locator('.success-message')).toContainText('sent successfully')
})
```

## Monitoring & Logging

**Recommended Logging**:
```typescript
console.log({
  type: 'contact_form_submission',
  name: name.substring(0, 20),  // Truncated for privacy
  emailDomain: email.split('@')[1],
  messageLength: message.length,
  timestamp: new Date().toISOString(),
  success: true
})
```

**Metrics to Track**:
- Submission success rate
- Email delivery success rate
- Average response time
- Rate limit hits
- Validation error types
- Spam attempts blocked

## Future Enhancements

Potential improvements (not in current scope):
- Email verification (double opt-in)
- Attachment support
- Rich text message formatting
- Auto-response email to sender
- CRM integration
- Analytics tracking per submission source
- Custom form fields (company, phone, etc.)
- Multi-language support
- CAPTCHA integration for high spam scenarios

## Summary

The API contract defines a single, secure contact form endpoint with:
- Clear request/response formats
- Comprehensive validation
- Rate limiting protection
- Spam prevention via honeypot
- Detailed error messages
- Email service integration
- Complete testing strategy
