import { CollectionConfig } from 'payload'

const SchoolProfile: CollectionConfig = {
  slug: 'schoolProfile',
  admin: {
    useAsTitle: 'schoolName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'schoolName',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'accreditation',
      type: 'group',
      fields: [
        {
          name: 'rating',
          type: 'text',
        },
        {
          name: 'certificateNumber',
          type: 'text',
        },
        {
          name: 'validUntil',
          type: 'date',
        },
      ],
    },
    {
      name: 'history',
      type: 'richText',
      localized: true,
    },
    {
      name: 'vision',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'mission',
      type: 'array',
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'facilities',
      type: 'array',
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
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}

export default SchoolProfile
