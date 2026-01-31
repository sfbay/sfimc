import type { CollectionConfig } from 'payload'

export const Stories: CollectionConfig = {
  slug: 'stories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'member', 'impactType', 'featured', 'publishedDate'],
    description: 'Curated impact stories with documented outcomes',
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Story Headline',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Original Story URL',
      admin: {
        description: 'Link to the full story on the member publication site',
      },
    },
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      label: 'Source Publication',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Publication Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM d, yyyy',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 400,
      label: 'Story Excerpt',
      admin: {
        description: 'Brief summary of the story (2-3 sentences)',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'impactType',
          type: 'select',
          required: true,
          label: 'Impact Category',
          options: [
            { label: 'Policy Changed', value: 'policy' },
            { label: 'Accountability Achieved', value: 'accountability' },
            { label: 'Resources Connected', value: 'resources' },
            { label: 'Award/Recognition', value: 'recognition' },
            { label: 'Community Response', value: 'community' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          label: 'Featured Story',
          admin: {
            width: '50%',
            description: 'Show in featured section',
          },
        },
      ],
    },
    {
      name: 'impactDescription',
      type: 'textarea',
      required: true,
      label: 'Documented Outcome',
      admin: {
        description: 'What real-world impact did this story have? Be specific.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Story Image',
      admin: {
        description: 'Photo from the story or related to the impact',
      },
    },
    {
      name: 'sourceNewsItem',
      type: 'relationship',
      relationTo: 'news-items',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'If promoted from RSS aggregator',
      },
    },
  ],
}
