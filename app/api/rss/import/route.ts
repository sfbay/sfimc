import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { getPayloadClient } from '@/lib/payload/client'
import { extractCategory, sanitizeText, sanitizeUrl } from '@/lib/news'

/**
 * RSS Import API Route
 *
 * Accepts browser-scraped RSS items and inserts them into Payload.
 * Used for feeds that require browser JS execution to bypass bot protection.
 *
 * Security: Requires CRON_SECRET query parameter.
 */

interface ImportItem {
  guid: string
  title: string
  url: string
  pubDate: string
  description?: string
  category?: string
  image?: string | null
  memberSlug: string
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  // Verify cron secret for security
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (!secret || !constantTimeEqual(secret, process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const items: ImportItem[] = await request.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    let created = 0
    let skipped = 0
    const errors: { guid: string; error: string }[] = []

    for (const item of items) {
      try {
        // Check if already exists
        const existing = await payload.find({
          collection: 'news-items',
          where: { guid: { equals: item.guid } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          skipped++
          continue
        }

        // Determine category
        const category = extractCategory(
          item.category ? [item.category] : [],
          item.title
        )

        // Create new item
        await payload.create({
          collection: 'news-items',
          data: {
            guid: item.guid,
            title: sanitizeText(item.title),
            url: sanitizeUrl(item.url) || item.url,
            description: sanitizeText(item.description || ''),
            memberSlug: item.memberSlug,
            pubDate: item.pubDate,
            image: item.image ? sanitizeUrl(item.image) : undefined,
            category,
          },
        })
        created++
      } catch (err) {
        errors.push({
          guid: item.guid,
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        total: items.length,
        created,
        skipped,
        errors: errors.length,
      },
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
