import type { CollectionConfig } from 'payload'

export const NewsItems: CollectionConfig = {
  slug: 'news-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'member', 'pubDate', 'featured', 'promoted'],
    description: 'Aggregated content from member RSS feeds',
    group: 'Aggregator',
  },
  access: {
    read: () => true,
    create: () => true, // RSS poller can create
    update: () => true, // Allow updates for deduplication
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
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
      label: 'Source Publication',
      index: true,
    },
    {
      name: 'memberSlug',
      type: 'text',
      label: 'Member Slug',
      admin: {
        description: 'Cached member slug for faster lookups',
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'pubDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      admin: {
        position: 'sidebar',
      },
      index: true,
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
      index: true,
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
      name: 'category',
      type: 'text',
      label: 'Category',
      admin: {
        description: 'Auto-detected or from RSS categories',
      },
      index: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured',
      admin: {
        position: 'sidebar',
        description: 'Feature in newsletter or homepage',
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
