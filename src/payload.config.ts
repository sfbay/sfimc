import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

import { Members } from './payload/collections/Members'
import { Stories } from './payload/collections/Stories'
import { NewsItems } from './payload/collections/NewsItems'
import { Pages } from './payload/collections/Pages'
import { Media } from './payload/collections/Media'
import { Users } from './payload/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | SFIMC Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
    components: {
      graphics: {
        Logo: '@/payload/admin/Logo#Logo',
        Icon: '@/payload/admin/Icon#Icon',
      },
    },
  },

  collections: [
    Members,
    Stories,
    NewsItems,
    Pages,
    Media,
    Users,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'sfimc-development-secret-change-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // Cloudflare R2 storage (S3-compatible)
  plugins: process.env.S3_BUCKET ? [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
      },
    }),
  ] : [],
})
