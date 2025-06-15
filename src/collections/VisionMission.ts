import { GlobalConfig } from 'payload'

const VisionMission: GlobalConfig = {
  slug: 'visionMission',
  label: 'Vision & Mission',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'vision',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'missions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'mission',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'motto',
      type: 'text',
      localized: true,
    },
    {
      name: 'goals',
      type: 'richText',
      localized: true,
    },
  ],
}

export default VisionMission
