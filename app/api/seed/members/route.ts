import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'
import { members } from '@/data/members'

/**
 * Seed Members API
 * POST /api/seed/members?secret=<CRON_SECRET>
 *
 * Seeds all members from the static data file into Payload CMS
 */
export async function POST(request: Request) {
  // Verify secret for security
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('[Seed Members] Starting member seed...')

  try {
    const payload = await getPayloadClient()

    let created = 0
    let skipped = 0
    const errors: { name: string; error: string }[] = []

    for (const member of members) {
      try {
        // Check if member already exists
        const existing = await payload.find({
          collection: 'members',
          where: { slug: { equals: member.slug } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          console.log(`[Seed Members] Skipped: ${member.name} (already exists)`)
          skipped++
          continue
        }

        // Transform social links to array format for Payload
        const socialLinks: { platform: string; url: string }[] = []
        if (member.socialLinks) {
          if (member.socialLinks.twitter) {
            socialLinks.push({ platform: 'twitter', url: member.socialLinks.twitter })
          }
          if (member.socialLinks.facebook) {
            socialLinks.push({ platform: 'facebook', url: member.socialLinks.facebook })
          }
          if (member.socialLinks.instagram) {
            socialLinks.push({ platform: 'instagram', url: member.socialLinks.instagram })
          }
        }

        // Create member in Payload
        await payload.create({
          collection: 'members',
          data: {
            name: member.name,
            slug: member.slug,
            community: member.community,
            description: member.description,
            url: member.url,
            rssUrl: member.rssUrl || undefined,
            category: member.category,
            foundedYear: member.foundedYear,
            featured: false,
            socialLinks: socialLinks.length > 0 ? socialLinks : undefined,
          },
        })

        console.log(`[Seed Members] Created: ${member.name}`)
        created++
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error(`[Seed Members] Error creating ${member.name}:`, errorMessage)
        errors.push({ name: member.name, error: errorMessage })
      }
    }

    console.log(`[Seed Members] Complete. Created: ${created}, Skipped: ${skipped}, Errors: ${errors.length}`)

    return NextResponse.json({
      success: true,
      stats: {
        total: members.length,
        created,
        skipped,
        errors: errors.length,
      },
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error('[Seed Members] Fatal error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
