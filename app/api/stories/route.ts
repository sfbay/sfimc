import { NextResponse } from 'next/server'
import {
  fetchAllMemberFeeds,
  extractExcerpt,
  extractImageFromContent,
  isWithinTimeWindow,
  deduplicateByGuid,
  type MemberFeed,
} from '@/lib/rss/poller'
import {
  getMemberMeta,
  formatRelativeTime,
  extractCategory,
  RECENT_STORIES_WINDOW_HOURS,
} from '@/lib/news'

// Member RSS feeds
// Note: Some feeds are temporarily disabled due to URL changes or access issues
const memberFeeds: MemberFeed[] = [
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
    rssUrl: 'https://www.sfpublicpress.org/feed/',
  },
  // TODO: Fix these feeds - currently returning 404/403
  // {
  //   memberId: '1',
  //   memberName: 'El Tecolote',
  //   memberSlug: 'el-tecolote',
  //   rssUrl: 'https://eltecolote.org/feed/',
  // },
  // {
  //   memberId: '5',
  //   memberName: 'Bay Area Reporter',
  //   memberSlug: 'bay-area-reporter',
  //   rssUrl: 'https://ebar.com/feed/',
  // },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

  try {
    // Fetch all feeds
    const { items, errors } = await fetchAllMemberFeeds(memberFeeds)

    // Log errors but continue
    if (errors.length > 0) {
      console.warn('[Stories API] Some feeds failed:', errors)
    }

    // Filter to recent items (last 7 days)
    const recentItems = items.filter((item) => isWithinTimeWindow(item.pubDate, RECENT_STORIES_WINDOW_HOURS))

    // Deduplicate
    const uniqueItems = deduplicateByGuid(recentItems)

    // Process and enrich items
    const stories = uniqueItems.map((item) => {
      const meta = getMemberMeta(item.memberSlug)

      return {
        id: item.guid,
        title: item.title,
        excerpt: extractExcerpt(item.description || item.content, 150),
        publication: meta.name,
        publicationSlug: item.memberSlug,
        publicationLogo: meta.logo || undefined,
        publicationColor: meta.color,
        category: extractCategory(item.categories, item.title),
        timeAgo: formatRelativeTime(item.pubDate),
        pubDate: item.pubDate,
        href: item.link,
        imageUrl: item.enclosure?.url || extractImageFromContent(item.content) || undefined,
      }
    })

    // Apply pagination
    const paginatedStories = stories.slice(offset, offset + limit)

    return NextResponse.json({
      stories: paginatedStories,
      total: stories.length,
      limit,
      offset,
      hasMore: offset + limit < stories.length,
      fetchedAt: new Date().toISOString(),
      feedsSuccessful: memberFeeds.length - errors.length,
      feedsTotal: memberFeeds.length,
    })
  } catch (error) {
    console.error('[Stories API] Error:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch stories',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Revalidate every 5 minutes
export const revalidate = 300
