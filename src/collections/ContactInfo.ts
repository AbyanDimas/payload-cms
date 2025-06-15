import { GlobalConfig } from 'payload';

const ContactInfo: GlobalConfig = {
  slug: 'contactInfo',
  label: 'Contact Information',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'whatsapp',
      type: 'text',
    },
    {
      name: 'operatingHours',
      type: 'textarea',
      required: true,
    },
    {
      name: 'mapEmbed',
      type: 'textarea',
    },
    {
      name: 'specialMessage',
      type: 'textarea',
      localized: true,
    },
  ],
};

export default ContactInfo;