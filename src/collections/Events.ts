import { CollectionConfig } from 'payload'

const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'endDate', 'location'],
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
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Academic', value: 'academic' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Sports', value: 'sports' },
        { label: 'Meeting', value: 'meeting' },
      ],
    },
    {
      name: 'registrationRequired',
      type: 'checkbox',
    },
    {
      name: 'registrationLink',
      type: 'text',
      admin: {
        condition: (data) => data.registrationRequired,
      },
    },
  ],
}

export default Events
