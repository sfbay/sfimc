import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'
import { getMemberMeta, formatRelativeTime } from '@/lib/news'
import type { Where } from 'payload'

/**
 * News API - Fetch aggregated news from Payload CMS
 *
 * Supports filtering by member, category, and search.
 * Returns paginated results with "Load More" support.
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse query parameters
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const member = searchParams.get('member') // member slug
  const category = searchParams.get('category')
  const search = searchParams.get('search')?.trim()
  const featured = searchParams.get('featured') === 'true'

  try {
    const payload = await getPayloadClient()

    // Build where clause
    const where: Where = {}

    // Filter by member slug
    if (member && member !== 'all') {
      where.memberSlug = { equals: member }
    }

    // Filter by category
    if (category && category !== 'all') {
      where.category = { equals: category }
    }

    // Filter by featured
    if (featured) {
      where.featured = { equals: true }
    }

    // Search in title and description
    if (search) {
      where.or = [
        { title: { contains: search } },
        { description: { contains: search } },
      ]
    }

    // Query Payload
    const result = await payload.find({
      collection: 'news-items',
      where,
      limit,
      page: Math.floor(offset / limit) + 1,
      sort: '-pubDate',
    })

    // Transform to API response format
    const stories = result.docs.map((doc) => {
      const meta = getMemberMeta(doc.memberSlug as string)

      return {
        id: doc.id,
        title: doc.title,
        excerpt: doc.description || '',
        publication: meta.name,
        publicationSlug: doc.memberSlug || '',
        publicationLogo: meta.logo || undefined,
        publicationColor: meta.color,
        category: doc.category || 'News',
        timeAgo: formatRelativeTime(doc.pubDate as string),
        pubDate: doc.pubDate,
        href: doc.url,
        imageUrl: doc.image || undefined,
        featured: doc.featured || false,
      }
    })

    // Get unique categories for filter UI
    const categoriesResult = await payload.find({
      collection: 'news-items',
      limit: 0,
    })

    const allCategories = [...new Set(
      categoriesResult.docs
        .map((d) => d.category)
        .filter(Boolean) as string[]
    )].sort()

    return NextResponse.json({
      stories,
      total: result.totalDocs,
      limit,
      offset,
      hasMore: result.hasNextPage,
      page: result.page,
      totalPages: result.totalPages,
      fetchedAt: new Date().toISOString(),
      filters: {
        categories: allCategories,
      },
    })
  } catch (error) {
    console.error('[News API] Error:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch news',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Revalidate every 5 minutes (matches RSS poll frequency)
export const revalidate = 300
