import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'
import { isValidEmail, checkRateLimit } from '@/lib/news'

/**
 * Newsletter Subscribe API
 *
 * Handles email subscription with:
 * - Payload CMS storage
 * - Optional Resend audience sync (when RESEND_API_KEY is set)
 * - Duplicate prevention
 * - Rate limiting to prevent abuse
 * - Consistent responses to prevent email enumeration
 */

// Standard success message (prevents email enumeration attacks)
const SUCCESS_MESSAGE = 'Thanks for subscribing! Check your inbox for a confirmation.'

export async function POST(request: Request) {
  try {
    // Rate limit by IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown'

    const rateLimitResult = checkRateLimit(`newsletter:${ip}`, 5, 3600000) // 5 per hour

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.resetInSeconds),
          },
        }
      )
    }

    const body = await request.json()
    const { email, source = 'website', tags = ['weekly-digest'] } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    // Check if subscriber already exists
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: normalizedEmail } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const subscriber = existing.docs[0]

      // If already subscribed and active, return success (idempotent)
      // Use the same message to prevent email enumeration
      if (subscriber.status === 'active') {
        return NextResponse.json({
          success: true,
          message: SUCCESS_MESSAGE,
        })
      }

      // If previously unsubscribed, reactivate
      if (subscriber.status === 'unsubscribed') {
        await payload.update({
          collection: 'subscribers',
          id: subscriber.id,
          data: {
            status: 'active',
            subscribedAt: new Date().toISOString(),
            unsubscribedAt: null,
          },
        })

        // Use the same message to prevent email enumeration
        return NextResponse.json({
          success: true,
          message: SUCCESS_MESSAGE,
        })
      }
    }

    // Create new subscriber
    const subscriber = await payload.create({
      collection: 'subscribers',
      data: {
        email: normalizedEmail,
        status: 'active',
        subscribedAt: new Date().toISOString(),
        source,
        tags,
      },
    })

    // Sync to Resend if API key is configured
    let resendContactId: string | undefined
    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
      try {
        const resendResponse = await fetch('https://api.resend.com/contacts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: normalizedEmail,
            audience_id: process.env.RESEND_AUDIENCE_ID,
            unsubscribed: false,
          }),
        })

        if (resendResponse.ok) {
          const resendData = await resendResponse.json()
          resendContactId = resendData.id

          // Update subscriber with Resend ID
          await payload.update({
            collection: 'subscribers',
            id: subscriber.id,
            data: { resendContactId },
          })
        } else {
          console.warn('[Newsletter] Failed to sync to Resend:', await resendResponse.text())
        }
      } catch (resendError) {
        console.error('[Newsletter] Resend sync error:', resendError)
        // Don't fail the subscription if Resend sync fails
      }
    }

    console.log(`[Newsletter] New subscriber: ${normalizedEmail} (source: ${source})`)

    // Use consistent message to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: SUCCESS_MESSAGE,
    })
  } catch (error) {
    console.error('[Newsletter] Subscribe error:', error)

    return NextResponse.json(
      {
        error: 'Failed to subscribe',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
