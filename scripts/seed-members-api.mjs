/**
 * Seed members via Payload REST API
 * Run with: node scripts/seed-members-api.mjs
 */

import { members } from '../src/data/members.ts'

const API_URL = 'http://localhost:3000/api'

async function seedMembers() {
  console.log('🌱 Starting member seed via API...\n')

  let created = 0
  let skipped = 0
  let errors = 0

  for (const member of members) {
    try {
      // Check if member already exists
      const checkResponse = await fetch(`${API_URL}/members?where[slug][equals]=${member.slug}&limit=1`)
      const checkData = await checkResponse.json()

      if (checkData.docs && checkData.docs.length > 0) {
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

      // Create member via API
      const response = await fetch(`${API_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        }),
      })

      if (response.ok) {
        console.log(`✅ Created: ${member.name}`)
        created++
      } else {
        const error = await response.json()
        console.error(`❌ Error creating ${member.name}:`, error.errors || error.message)
        errors++
      }
    } catch (error) {
      console.error(`❌ Error creating ${member.name}:`, error.message)
      errors++
    }
  }

  console.log('\n📊 Seed Summary:')
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)
}

seedMembers().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
