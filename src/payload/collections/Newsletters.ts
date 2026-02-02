import type { CollectionConfig } from 'payload'

/**
 * Newsletters Collection
 *
 * Tracks newsletter drafts, scheduled sends, and sent newsletters.
 * Supports hybrid auto-draft + manual curation workflow.
 */
export const Newsletters: CollectionConfig = {
  slug: 'newsletters',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'status', 'scheduledFor', 'sentAt', 'recipientCount'],
    description: 'Newsletter drafts and sent emails',
    group: 'Newsletter',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Email Subject',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Ready to Send', value: 'ready' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Sending', value: 'sending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'weekly-digest',
      options: [
        { label: 'Weekly Digest', value: 'weekly-digest' },
        { label: 'Breaking News', value: 'breaking-news' },
        { label: 'Policy Update', value: 'policy-update' },
        { label: 'Custom', value: 'custom' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      label: 'Introduction',
      admin: {
        description: 'Custom intro text at the top of the newsletter',
      },
    },
    {
      name: 'curatedItems',
      type: 'relationship',
      relationTo: 'news-items',
      hasMany: true,
      label: 'Curated Stories',
      admin: {
        description: 'Stories to include in this newsletter (order matters)',
      },
    },
    {
      name: 'featuredItem',
      type: 'relationship',
      relationTo: 'news-items',
      label: 'Featured Story',
      admin: {
        description: 'Main story to highlight at the top',
      },
    },
    {
      name: 'scheduledFor',
      type: 'date',
      label: 'Scheduled Send Time',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'sentAt',
      type: 'date',
      label: 'Sent At',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'recipientCount',
      type: 'number',
      label: 'Recipients',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'resendBatchId',
      type: 'text',
      label: 'Resend Batch ID',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Batch ID from Resend for tracking',
      },
    },
    {
      name: 'openRate',
      type: 'number',
      label: 'Open Rate (%)',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'clickRate',
      type: 'number',
      label: 'Click Rate (%)',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'dateRange',
      type: 'group',
      label: 'Content Date Range',
      admin: {
        description: 'Date range for auto-generated content',
      },
      fields: [
        {
          name: 'from',
          type: 'date',
          label: 'From',
        },
        {
          name: 'to',
          type: 'date',
          label: 'To',
        },
      ],
    },
    {
      name: 'error',
      type: 'textarea',
      label: 'Error Message',
      admin: {
        condition: (data) => data?.status === 'failed',
        readOnly: true,
      },
    },
  ],
}
