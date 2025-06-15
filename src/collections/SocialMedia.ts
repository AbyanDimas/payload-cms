import { GlobalConfig } from 'payload';

const SocialMedia: GlobalConfig = {
  slug: 'socialMedia',
  label: 'Social Media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'facebook',
      type: 'text',
    },
    {
      name: 'instagram',
      type: 'text',
    },
    {
      name: 'youtube',
      type: 'text',
    },
    {
      name: 'tiktok',
      type: 'text',
    },
    {
      name: 'whatsapp',
      type: 'text',
    },
    {
      name: 'twitter',
      type: 'text',
    },
    {
      name: 'linkedin',
      type: 'text',
    },
  ],
};

export default SocialMedia;