import { NextResponse } from 'next/server'
import {
  fetchAllMemberFeeds,
  extractExcerpt,
  extractImageFromContent,
  isWithinTimeWindow,
  deduplicateByGuid,
  type MemberFeed,
} from '@/lib/rss/poller'

// Member metadata for enriching stories
const memberMeta: Record<string, { name: string; logo: string; color: string }> = {
  'el-tecolote': {
    name: 'El Tecolote',
    logo: '/images/publishers/el-tecolote.png',
    color: '#dcae27',
  },
  'mission-local': {
    name: 'Mission Local',
    logo: '/images/publishers/mission-local.png',
    color: '#0b525b',
  },
  'the-bay-view': {
    name: 'The Bay View',
    logo: '/images/publishers/bayview-hp.png',
    color: '#0b525b',
  },
  'sf-public-press': {
    name: 'SF Public Press',
    logo: '/images/publishers/sf-public-press.png',
    color: '#ff4f1f',
  },
  'bay-area-reporter': {
    name: 'Bay Area Reporter',
    logo: '/images/publishers/bayarea-reporter.png',
    color: '#c41e6a',
  },
  'nichi-bei': {
    name: 'Nichi Bei',
    logo: '',
    color: '#14919b',
  },
  'sing-tao': {
    name: 'Sing Tao',
    logo: '/images/publishers/sing-tao.png',
    color: '#c41e6a',
  },
  'potrero-view': {
    name: 'Potrero View',
    logo: '/images/publishers/potrero-view.png',
    color: '#0b525b',
  },
}

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

/**
 * Format relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

/**
 * Extract category from RSS categories or title
 */
function extractCategory(categories?: string[], title?: string): string {
  // Try to use RSS categories
  if (categories && categories.length > 0) {
    // Filter out generic categories
    const validCategories = categories.filter(
      (cat) => !['uncategorized', 'featured', 'news'].includes(cat.toLowerCase())
    )
    if (validCategories.length > 0) {
      return validCategories[0]
    }
  }

  // Fallback: guess from title keywords
  const titleLower = title?.toLowerCase() || ''
  if (titleLower.includes('housing') || titleLower.includes('rent')) return 'Housing'
  if (titleLower.includes('police') || titleLower.includes('crime')) return 'Public Safety'
  if (titleLower.includes('school') || titleLower.includes('education')) return 'Education'
  if (titleLower.includes('health') || titleLower.includes('covid')) return 'Health'
  if (titleLower.includes('election') || titleLower.includes('vote')) return 'Politics'
  if (titleLower.includes('business') || titleLower.includes('economic')) return 'Business'
  if (titleLower.includes('art') || titleLower.includes('music') || titleLower.includes('culture')) return 'Culture'

  return 'News'
}

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
    const recentItems = items.filter((item) => isWithinTimeWindow(item.pubDate, 168))

    // Deduplicate
    const uniqueItems = deduplicateByGuid(recentItems)

    // Process and enrich items
    const stories = uniqueItems.map((item) => {
      const meta = memberMeta[item.memberSlug] || {
        name: item.memberSlug,
        logo: '',
        color: '#78716c',
      }

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
