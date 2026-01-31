import type { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'community', 'category', 'featured'],
    description: 'Coalition member publications',
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Publication Name',
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
      name: 'community',
      type: 'text',
      required: true,
      label: 'Community Served',
      admin: {
        description: 'e.g., "Mission District · Latino" or "Citywide · LGBTQ+"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      maxLength: 300,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Website URL',
    },
    {
      name: 'rssUrl',
      type: 'text',
      label: 'RSS Feed URL',
      admin: {
        description: 'For automatic content aggregation',
      },
    },
    {
      name: 'category',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Ethnic Media', value: 'ethnic' },
        { label: 'Neighborhood', value: 'neighborhood' },
        { label: 'Investigative', value: 'investigative' },
        { label: 'LGBTQ+', value: 'lgbtq' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Publication Logo',
    },
    {
      name: 'teamPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Team/Community Photo',
      admin: {
        description: 'Photo of the team or community they serve',
      },
    },
    {
      name: 'foundedYear',
      type: 'number',
      label: 'Founded Year',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
