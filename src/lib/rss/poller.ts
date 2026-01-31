import Parser from 'rss-parser'

export interface RSSItem {
  guid: string
  title: string
  link: string
  description?: string
  content?: string
  pubDate: string
  creator?: string
  categories?: string[]
  enclosure?: {
    url: string
    type?: string
    length?: string
  }
}

export interface RSSFeed {
  title: string
  description?: string
  link: string
  items: RSSItem[]
}

export interface MemberFeed {
  memberId: string
  memberName: string
  memberSlug: string
  rssUrl: string
}

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator'],
      ['media:content', 'mediaContent'],
    ],
  },
})

/**
 * Fetch and parse a single RSS feed
 */
export async function fetchFeed(url: string): Promise<RSSFeed | null> {
  try {
    const feed = await parser.parseURL(url)

    return {
      title: feed.title || '',
      description: feed.description,
      link: feed.link || url,
      items: feed.items.map((item) => ({
        guid: item.guid || item.link || `${url}-${item.title}-${item.pubDate}`,
        title: item.title || 'Untitled',
        link: item.link || '',
        description: item.contentSnippet || item.summary,
        content: (item as any).contentEncoded || item.content,
        pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
        creator: (item as any).creator || item.author,
        categories: item.categories,
        enclosure: item.enclosure
          ? {
              url: item.enclosure.url,
              type: item.enclosure.type,
              length: item.enclosure.length,
            }
          : undefined,
      })),
    }
  } catch (error) {
    console.error(`Failed to fetch feed from ${url}:`, error)
    return null
  }
}

/**
 * Fetch all member feeds and aggregate items
 */
export async function fetchAllMemberFeeds(
  memberFeeds: MemberFeed[]
): Promise<{
  items: (RSSItem & { memberId: string; memberSlug: string })[]
  errors: { memberId: string; error: string }[]
}> {
  const results = await Promise.allSettled(
    memberFeeds.map(async (member) => {
      const feed = await fetchFeed(member.rssUrl)
      if (!feed) {
        throw new Error(`Failed to fetch feed for ${member.memberName}`)
      }
      return {
        memberId: member.memberId,
        memberSlug: member.memberSlug,
        items: feed.items,
      }
    })
  )

  const items: (RSSItem & { memberId: string; memberSlug: string })[] = []
  const errors: { memberId: string; error: string }[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      result.value.items.forEach((item) => {
        items.push({
          ...item,
          memberId: result.value.memberId,
          memberSlug: result.value.memberSlug,
        })
      })
    } else {
      errors.push({
        memberId: memberFeeds[index].memberId,
        error: result.reason.message,
      })
    }
  })

  // Sort by publication date, newest first
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  return { items, errors }
}

/**
 * Extract first image from HTML content
 */
export function extractImageFromContent(content?: string): string | null {
  if (!content) return null

  // Try to find img tag
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (imgMatch) return imgMatch[1]

  // Try to find figure/picture tag
  const srcMatch = content.match(/src=["']([^"']+\.(jpg|jpeg|png|gif|webp))["']/i)
  if (srcMatch) return srcMatch[1]

  return null
}

/**
 * Clean HTML and extract plain text excerpt
 */
export function extractExcerpt(content?: string, maxLength = 200): string {
  if (!content) return ''

  // Remove HTML tags
  const text = content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text

  // Truncate at word boundary
  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  return `${truncated.slice(0, lastSpace)}...`
}

/**
 * Check if an item is within a certain time window (for "recent" filtering)
 */
export function isWithinTimeWindow(pubDate: string, windowHours = 168): boolean {
  // Default: 7 days (168 hours)
  const itemDate = new Date(pubDate)

  // Validate the date
  if (isNaN(itemDate.getTime())) {
    console.warn(`[RSS Poller] Invalid date string: ${pubDate}`)
    return false
  }

  const now = new Date()
  const diffHours = (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60)

  return diffHours <= windowHours
}

/**
 * Deduplicate items by GUID
 */
export function deduplicateByGuid<T extends { guid: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.guid)) return false
    seen.add(item.guid)
    return true
  })
}
