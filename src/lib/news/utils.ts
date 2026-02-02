import { members } from '@/data/members'

/**
 * News utilities shared across API routes and components
 * Centralizes logic that was previously duplicated
 */

// Time constants
export const RECENT_STORIES_WINDOW_HOURS = 168 // 7 days

/**
 * Member metadata for UI display
 */
export interface MemberMeta {
  name: string
  logo: string
  color: string
}

const DEFAULT_MEMBER_META: MemberMeta = {
  name: 'Unknown',
  logo: '',
  color: '#78716c',
}

/**
 * Get member metadata for display (logo, color, name)
 * Uses the centralized members data source
 */
export function getMemberMeta(slug: string): MemberMeta {
  const member = members.find((m) => m.slug === slug)
  if (!member) {
    return { ...DEFAULT_MEMBER_META, name: slug || 'Unknown' }
  }

  // Map slug to logo path (consistent naming convention)
  // Empty string means no logo available yet
  const logoMap: { [key: string]: string } = {
    'el-tecolote': '/images/publishers/el-tecolote.png',
    'mission-local': '/images/publishers/mission-local.png',
    'the-bay-view': '/images/publishers/bayview-hp.png',
    'sf-public-press': '/images/publishers/sf-public-press.png',
    'bay-area-reporter': '/images/publishers/bayarea-reporter.png',
    'nichi-bei': '',
    'j-weekly': '',
    'richmond-review': '',
    'sunset-beacon': '',
    'sing-tao': '/images/publishers/sing-tao.png',
    'wind-newspaper': '',
    '48-hills': '',
    'broke-ass-stuart': '',
    'ingleside-light': '',
    'potrero-view': '/images/publishers/potrero-view.png',
  }

  const logoValue = logoMap[slug]

  return {
    name: member.name,
    logo: typeof logoValue === 'string' ? logoValue : '',
    color: member.color || DEFAULT_MEMBER_META.color,
  }
}

/**
 * Format date as relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
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
 * Extract category from RSS categories or title keywords
 */
export function extractCategory(categories?: string[], title?: string): string {
  // Try to use RSS categories first
  if (categories && categories.length > 0) {
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
  if (titleLower.includes('art') || titleLower.includes('music') || titleLower.includes('culture'))
    return 'Culture'

  return 'News'
}

/**
 * Email validation
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.toLowerCase().trim())
}

/**
 * Sanitize text content from RSS feeds
 * Removes HTML tags and dangerous content
 */
export function sanitizeText(text: string | undefined | null): string {
  if (!text) return ''

  return text
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode common HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Remove potential script injections
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Validate and sanitize URL
 * Returns empty string if URL is invalid or potentially dangerous
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return ''
    }
    return parsed.toString()
  } catch {
    return ''
  }
}

/**
 * Simple in-memory rate limiter for API routes
 * Note: This resets on server restart. For production, use Redis.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetInSeconds: number
}

export function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 3600000 // 1 hour
): RateLimitResult {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [k, v] of rateLimitMap) {
      if (now > v.resetTime) {
        rateLimitMap.delete(k)
      }
    }
  }

  if (!record || now > record.resetTime) {
    // Create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return {
      success: true,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    }
  }

  if (record.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    }
  }

  record.count++
  return {
    success: true,
    remaining: maxRequests - record.count,
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  }
}
