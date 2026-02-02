import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import {
  fetchAllMemberFeeds,
  extractExcerpt,
  extractImageFromContent,
  isWithinTimeWindow,
  deduplicateByGuid,
  type MemberFeed,
} from '@/lib/rss/poller'
import { getPayloadClient } from '@/lib/payload/client'
import {
  extractCategory,
  sanitizeText,
  sanitizeUrl,
  RECENT_STORIES_WINDOW_HOURS,
} from '@/lib/news'

/**
 * RSS Poll API Route
 *
 * Designed to be called by an external cron service (GitHub Actions, Vercel Cron)
 * to poll member RSS feeds and persist to Payload CMS.
 *
 * Security: Requires CRON_SECRET query parameter.
 */

// Fallback member feeds if Payload query fails or is empty
// These match the members we know have working feeds
const FALLBACK_FEEDS: MemberFeed[] = [
  {
    memberId: 'mission-local',
    memberName: 'Mission Local',
    memberSlug: 'mission-local',
    rssUrl: 'https://missionlocal.org/feed/',
  },
  {
    memberId: 'the-bay-view',
    memberName: 'The Bay View',
    memberSlug: 'the-bay-view',
    rssUrl: 'https://sfbayview.com/feed/',
  },
  {
    memberId: 'sf-public-press',
    memberName: 'SF Public Press',
    memberSlug: 'sf-public-press',
    rssUrl: 'https://www.sfpublicpress.org/feed/',
  },
]

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  // Verify cron secret for security
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // CRON_SECRET must always be set for security
  if (!process.env.CRON_SECRET) {
    console.error('[RSS Poll] CRON_SECRET is not configured')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  // Validate secret using constant-time comparison to prevent timing attacks
  if (!secret || !constantTimeEqual(secret, process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const startTime = Date.now()
  console.log(`[RSS Poll] Starting feed poll at ${new Date().toISOString()}`)

  try {
    const payload = await getPayloadClient()

    // Try to fetch members with RSS URLs from Payload
    let memberFeeds: MemberFeed[] = []

    try {
      const membersResult = await payload.find({
        collection: 'members',
        where: {
          rssUrl: { exists: true },
        },
        limit: 100,
      })

      memberFeeds = membersResult.docs
        .filter((m) => m.rssUrl)
        .map((m) => ({
          memberId: String(m.id),
          memberName: m.name as string,
          memberSlug: m.slug as string,
          rssUrl: m.rssUrl as string,
        }))

      console.log(`[RSS Poll] Found ${memberFeeds.length} members with RSS feeds in Payload`)
    } catch (err) {
      console.warn('[RSS Poll] Failed to fetch members from Payload, using fallback:', err)
    }

    // Use fallback if no members found
    if (memberFeeds.length === 0) {
      console.log('[RSS Poll] Using fallback feed list')
      memberFeeds = FALLBACK_FEEDS
    }

    // Fetch all feeds
    const { items, errors } = await fetchAllMemberFeeds(memberFeeds)

    // Log any feed errors
    if (errors.length > 0) {
      console.warn('[RSS Poll] Some feeds failed:', errors)
    }

    // Filter to recent items (last 7 days)
    const recentItems = items.filter((item) => isWithinTimeWindow(item.pubDate, RECENT_STORIES_WINDOW_HOURS))

    // Deduplicate by GUID
    const uniqueItems = deduplicateByGuid(recentItems)

    // Track upsert stats
    let created = 0
    let updated = 0
    let skipped = 0
    const upsertErrors: { guid: string; error: string }[] = []

    // Upsert each item to Payload
    for (const item of uniqueItems) {
      try {
        // Check if item already exists by GUID
        const existing = await payload.find({
          collection: 'news-items',
          where: { guid: { equals: item.guid } },
          limit: 1,
        })

        const category = extractCategory(item.categories, item.title)
        const rawImageUrl = item.enclosure?.url || extractImageFromContent(item.content)
        const imageUrl = rawImageUrl ? sanitizeUrl(rawImageUrl) : undefined

        // Sanitize all text content to prevent XSS
        const newsItemData = {
          guid: item.guid,
          title: sanitizeText(item.title),
          url: sanitizeUrl(item.link) || item.link, // Keep original if sanitization fails
          description: sanitizeText(extractExcerpt(item.description || item.content, 200)),
          memberSlug: item.memberSlug,
          pubDate: new Date(item.pubDate).toISOString(),
          image: imageUrl || undefined,
          category,
        }

        if (existing.docs.length > 0) {
          // Item exists - skip (or update if we want to refresh content)
          skipped++
        } else {
          // Create new item
          await payload.create({
            collection: 'news-items',
            data: newsItemData,
          })
          created++
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error(`[RSS Poll] Failed to upsert item ${item.guid}:`, errorMessage)
        upsertErrors.push({ guid: item.guid, error: errorMessage })
      }
    }

    const duration = Date.now() - startTime
    console.log(
      `[RSS Poll] Completed in ${duration}ms. Created: ${created}, Skipped: ${skipped}, Errors: ${upsertErrors.length}`
    )

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      stats: {
        totalFeeds: memberFeeds.length,
        successfulFeeds: memberFeeds.length - errors.length,
        failedFeeds: errors.length,
        itemsFetched: items.length,
        itemsAfterFilter: recentItems.length,
        itemsAfterDedupe: uniqueItems.length,
        created,
        updated,
        skipped,
        upsertErrors: upsertErrors.length,
      },
      feedErrors: errors.length > 0 ? errors : undefined,
      upsertErrors: upsertErrors.length > 0 ? upsertErrors.slice(0, 10) : undefined,
      // Include sample of recent items for debugging (not in production)
      ...(process.env.NODE_ENV === 'development' && {
        sampleItems: uniqueItems.slice(0, 3).map((i) => ({
          title: i.title,
          guid: i.guid,
          memberSlug: i.memberSlug,
        })),
      }),
    })
  } catch (error) {
    console.error('[RSS Poll] Fatal error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// Also support POST for webhook-style triggers
export async function POST(request: Request) {
  return GET(request)
}
