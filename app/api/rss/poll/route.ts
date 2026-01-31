import { NextResponse } from 'next/server'
import {
  fetchAllMemberFeeds,
  extractExcerpt,
  extractImageFromContent,
  isWithinTimeWindow,
  deduplicateByGuid,
  type MemberFeed,
} from '@/lib/rss/poller'

// This API route is designed to be called by an external cron service
// (e.g., GitHub Actions, Vercel Cron) to poll RSS feeds and update the database

// Placeholder member feeds - will be replaced with Payload queries
const memberFeeds: MemberFeed[] = [
  {
    memberId: '1',
    memberName: 'El Tecolote',
    memberSlug: 'el-tecolote',
    rssUrl: 'https://eltecolote.org/feed/',
  },
  {
    memberId: '2',
    memberName: 'Mission Local',
    memberSlug: 'mission-local',
    rssUrl: 'https://missionlocal.org/feed/',
  },
  {
    memberId: '3',
    memberName: 'The Bay View',
    memberSlug: 'the-bay-view',
    rssUrl: 'https://sfbayview.com/feed/',
  },
  {
    memberId: '4',
    memberName: 'SF Public Press',
    memberSlug: 'sf-public-press',
    rssUrl: 'https://sfpublicpress.org/feed/',
  },
  {
    memberId: '5',
    memberName: 'Bay Area Reporter',
    memberSlug: 'bay-area-reporter',
    rssUrl: 'https://ebar.com/feed/',
  },
  {
    memberId: '6',
    memberName: 'Nichi Bei',
    memberSlug: 'nichi-bei',
    rssUrl: 'https://nichibei.org/feed/',
  },
]

export async function GET(request: Request) {
  // Verify cron secret for security - always require in production
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // In production, CRON_SECRET must be set
  if (process.env.NODE_ENV === 'production' && !process.env.CRON_SECRET) {
    console.error('[RSS Poll] CRON_SECRET is not configured')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  // Validate secret if configured
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log(`[RSS Poll] Starting feed poll at ${new Date().toISOString()}`)

    // Fetch all feeds
    const { items, errors } = await fetchAllMemberFeeds(memberFeeds)

    // Log any feed errors
    if (errors.length > 0) {
      console.warn('[RSS Poll] Some feeds failed:', errors)
    }

    // Filter to recent items (last 7 days)
    const recentItems = items.filter((item) => isWithinTimeWindow(item.pubDate, 168))

    // Deduplicate
    const uniqueItems = deduplicateByGuid(recentItems)

    // Process items for storage
    const processedItems = uniqueItems.map((item) => ({
      guid: item.guid,
      title: item.title,
      url: item.link,
      excerpt: extractExcerpt(item.description || item.content),
      imageUrl: item.enclosure?.url || extractImageFromContent(item.content),
      pubDate: item.pubDate,
      memberId: item.memberId,
      memberSlug: item.memberSlug,
    }))

    // TODO: Upsert to Payload CMS NewsItems collection
    // This would look something like:
    // for (const item of processedItems) {
    //   await payload.create({
    //     collection: 'news-items',
    //     data: {
    //       guid: item.guid,
    //       title: item.title,
    //       url: item.url,
    //       excerpt: item.excerpt,
    //       imageUrl: item.imageUrl,
    //       pubDate: item.pubDate,
    //       member: item.memberId,
    //     },
    //   })
    // }

    console.log(`[RSS Poll] Completed. Processed ${processedItems.length} items from ${memberFeeds.length - errors.length} feeds`)

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      stats: {
        totalFeeds: memberFeeds.length,
        successfulFeeds: memberFeeds.length - errors.length,
        failedFeeds: errors.length,
        itemsProcessed: processedItems.length,
        itemsFiltered: items.length - recentItems.length,
      },
      errors: errors.length > 0 ? errors : undefined,
      // Include sample of recent items for debugging (not in production)
      ...(process.env.NODE_ENV === 'development' && {
        sampleItems: processedItems.slice(0, 5),
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
