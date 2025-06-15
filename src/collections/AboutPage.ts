import { GlobalConfig } from 'payload';

const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  label: 'About Page Content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'history',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'profileVideo',
      type: 'text',
    },
    {
      name: 'organizationChart',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'milestones',
      type: 'array',
      fields: [
        {
          name: 'year',
          type: 'number',
          required: true,
        },
        {
          name: 'event',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
};

export default AboutPage;