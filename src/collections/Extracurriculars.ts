import { CollectionConfig } from 'payload'

const Extracurriculars: CollectionConfig = {
  slug: 'extracurriculars',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'supervisor', 'schedule'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'schedule',
      type: 'group',
      fields: [
        {
          name: 'day',
          type: 'select',
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          required: true,
        },
        {
          name: 'time',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'requirements',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'achievements',
      type: 'array',
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
        },
        {
          name: 'achievement',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}

export default Extracurriculars
