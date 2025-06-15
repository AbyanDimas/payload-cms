import { CollectionConfig } from 'payload'

const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate'],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: process.env.DOCUMENTS_DIR || 'documents',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Academic', value: 'academic' },
        { label: 'Administrative', value: 'administrative' },
        { label: 'Policy', value: 'policy' },
        { label: 'Form', value: 'form' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      defaultValue: () => new Date(),
    },
    {
      name: 'validUntil',
      type: 'date',
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
        { label: 'Administrators', value: 'administrators' },
      ],
      defaultValue: ['all'],
    },
  ],
}

export default Documents
