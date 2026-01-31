import type { CollectionConfig } from 'payload'

export const NewsItems: CollectionConfig = {
  slug: 'news-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'member', 'pubDate', 'promoted'],
    description: 'Aggregated content from member RSS feeds',
    group: 'Aggregator',
  },
  access: {
    read: () => true,
    create: () => true, // RSS poller can create
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Original URL',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Summary/Excerpt',
    },
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      label: 'Source Publication',
    },
    {
      name: 'pubDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'guid',
      type: 'text',
      required: true,
      unique: true,
      label: 'RSS GUID',
      admin: {
        position: 'sidebar',
        description: 'Unique identifier for deduplication',
      },
    },
    {
      name: 'image',
      type: 'text',
      label: 'Image URL',
      admin: {
        description: 'Thumbnail from RSS feed (if available)',
      },
    },
    {
      name: 'promoted',
      type: 'checkbox',
      defaultValue: false,
      label: 'Promoted to Impact Story',
      admin: {
        position: 'sidebar',
        description: 'Has this been curated into an Impact Story?',
      },
    },
  ],
}
