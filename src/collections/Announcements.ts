import { CollectionConfig } from 'payload'

const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishDate', 'expiryDate'],
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
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
    },
    {
      name: 'expiryDate',
      type: 'date',
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      defaultValue: 'normal',
    },
    {
      name: 'targetGroups',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'All', value: 'all' },
        { label: 'Students', value: 'students' },
        { label: 'Teachers', value: 'teachers' },
        { label: 'Parents', value: 'parents' },
      ],
      defaultValue: ['all'],
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}

export default Announcements
