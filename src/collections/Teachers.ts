import { CollectionConfig } from 'payload'

const Teachers: CollectionConfig = {
  slug: 'teachers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'department', 'position'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'subjects',
      type: 'array',
      fields: [
        {
          name: 'subject',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'institution',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Teachers
