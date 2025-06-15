import { GlobalConfig } from 'payload';

const HomeBanner: GlobalConfig = {
  slug: 'homeBanner',
  label: 'Homepage Banner',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
        },
      ],
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      defaultValue: 'Learn More',
      localized: true,
    },
  ],
};

export default HomeBanner;