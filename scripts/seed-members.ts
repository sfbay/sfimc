/**
 * Seed members into Payload CMS database
 * Run with: npx tsx scripts/seed-members.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { members } from '../src/data/members'

async function seedMembers() {
  console.log('🌱 Starting member seed...\n')

  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let errors = 0

  for (const member of members) {
    try {
      // Check if member already exists
      const existing = await payload.find({
        collection: 'members',
        where: { slug: { equals: member.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Skipped: ${member.name} (already exists)`)
        skipped++
        continue
      }

      // Transform social links to array format for Payload
      const socialLinks = []
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

      console.log(`✅ Created: ${member.name}`)
      created++
    } catch (error) {
      console.error(`❌ Error creating ${member.name}:`, error)
      errors++
    }
  }

  console.log('\n📊 Seed Summary:')
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)

  process.exit(0)
}

seedMembers().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
