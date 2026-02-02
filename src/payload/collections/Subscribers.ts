import type { CollectionConfig } from 'payload'

/**
 * Subscribers Collection
 *
 * Stores newsletter subscribers with sync to external email service (Resend).
 * Supports multiple subscription types (weekly digest, breaking news, etc.)
 */
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'subscribedAt', 'tags'],
    description: 'Newsletter subscribers',
    group: 'Newsletter',
  },
  access: {
    read: () => true,
    // Only allow server-side creation (API routes)
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
        { label: 'Pending Confirmation', value: 'pending' },
      ],
      admin: {
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'resendContactId',
      type: 'text',
      label: 'Resend Contact ID',
      admin: {
        position: 'sidebar',
        description: 'ID from Resend for sync',
        readOnly: true,
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.status === 'unsubscribed',
      },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      defaultValue: ['weekly-digest'],
      options: [
        { label: 'Weekly Digest', value: 'weekly-digest' },
        { label: 'Breaking News', value: 'breaking-news' },
        { label: 'Policy Updates', value: 'policy-updates' },
        { label: 'Events', value: 'events' },
      ],
      admin: {
        description: 'Newsletter types this subscriber receives',
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Signup Source',
      admin: {
        description: 'Where did this subscriber sign up? (e.g., footer, news-page, homepage)',
      },
    },
  ],
}
