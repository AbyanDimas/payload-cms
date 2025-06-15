import { GlobalConfig } from 'payload';

const SchoolInfo: GlobalConfig = {
  slug: 'schoolInfo',
  label: 'School Information',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
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
      name: 'establishedYear',
      type: 'number',
      required: true,
    },
    {
      name: 'mapEmbed',
      type: 'textarea',
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
  ],
};

export default SchoolInfo;