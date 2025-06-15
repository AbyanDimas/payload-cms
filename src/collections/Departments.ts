import { CollectionConfig } from 'payload';

const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'headOfDepartment', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Basic Information
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for the department',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    
    // Visual Elements
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image representing the department',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo Gallery',
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
        }
      ],
    },
    
    // Department Leadership
    {
      name: 'headOfDepartment',
      type: 'group',
      label: 'Head of Department',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
    },
    
    // Academic Programs
    {
      name: 'programs',
      type: 'array',
      label: 'Academic Programs',
      fields: [
        {
          name: 'programName',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'programDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'programImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    
    // Industry Partners
    {
      name: 'industryPartners',
      type: 'array',
      label: 'Industry Partners',
      fields: [
        {
          name: 'partnerName',
          type: 'text',
          required: true,
        },
        {
          name: 'partnerLogo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'partnerWebsite',
          type: 'text',
          label: 'Website URL',
        },
        {
          name: 'collaborationDetails',
          type: 'textarea',
          label: 'Collaboration Details',
          localized: true,
        },
      ],
    },
    
    // SEO Fields
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Title for search engines (50-60 characters)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Description for search engines (150-160 characters)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          localized: true,
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Sharing Image',
        },
      ],
    },
    
    // Additional Information
    {
      name: 'contactInformation',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'location',
          type: 'text',
        },
      ],
    },
  ],
};

export default Departments;