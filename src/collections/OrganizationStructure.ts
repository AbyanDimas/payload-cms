import { CollectionConfig } from 'payload'

const OrganizationStructure: CollectionConfig = {
  slug: 'organizationStructure',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'structure',
      type: 'array',
      fields: [
        {
          name: 'level',
          type: 'number',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'responsibilities',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'chartImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'lastUpdated',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}

export default OrganizationStructure
