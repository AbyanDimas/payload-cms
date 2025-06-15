import { CollectionConfig } from 'payload';

const Achievements: CollectionConfig = {
  slug: 'achievements',
  admin: {
    useAsTitle: 'participantName',
    defaultColumns: ['participantName', 'competition', 'level', 'year'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'participantName',
      type: 'text',
      required: true,
    },
    {
      name: 'competition',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'level',
      type: 'select',
      options: [
        'School',
        'District',
        'Regency',
        'Province',
        'National',
        'International',
      ],
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 2000,
      max: new Date().getFullYear(),
    },
    {
      name: 'achievement',
      type: 'select',
      options: [
        '1st Place',
        '2nd Place',
        '3rd Place',
        'Honorable Mention',
        'Finalist',
        'Participation',
      ],
      required: true,
    },
    {
      name: 'certificate',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
    },
  ],
};

export default Achievements;