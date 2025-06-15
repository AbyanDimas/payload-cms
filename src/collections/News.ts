import { CollectionConfig } from 'payload/types'

const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'News Article',
    plural: 'News',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate', 'status', 'isFeatured'],
    group: 'Content',
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `/news/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
    max: 10,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        and: [
          { status: { equals: 'published' } },
          { publishDate: { less_than_equal: new Date().toISOString() } },
        ],
      }
    },
  },
  fields: [
    // Basic Information
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 120,
      admin: {
        description: 'News headline (max 120 characters)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value === 'string') {
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },

    // Content
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        elements: [
          'h2',
          'h3',
          'h4',
          'blockquote',
          'link',
          'ol',
          'ul',
          'indent',
        ],
        leaves: ['bold', 'italic', 'underline', 'strikethrough'],
        upload: {
          collections: {
            media: {
              fields: [
                {
                  name: 'caption',
                  type: 'text',
                },
                {
                  name: 'alignment',
                  type: 'select',
                  options: ['left', 'center', 'right'],
                },
              ],
            },
          },
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      maxLength: 200,
      admin: {
        description: 'Short summary for previews (max 200 characters)',
      },
    },

    // Visuals
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image displayed with the news article',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'imageGallery',
      type: 'array',
      label: 'Additional Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },

    // Metadata
    {
      name: 'publishDate',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Academic', value: 'academic' },
        { label: 'Event', value: 'event' },
        { label: 'Achievement', value: 'achievement' },
        { label: 'Announcement', value: 'announcement' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured News',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display this news in featured sections',
      },
    },

    // Related Content
    {
      name: 'relatedNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      filterOptions: ({ id }) => {
        return { id: { not_equals: id } }
      },
    },
    {
      name: 'relatedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
    },

    // SEO
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
        },
      ],
    },

    // Author Information
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => user.id,
      admin: {
        position: 'sidebar',
        allowCreate: false,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data.status === 'published') {
          data.publishedBy = req.user.id
          data.publishedAt = new Date()
        }
        return data
      },
    ],
  },
  endpoints: [
    {
      path: '/slug/:slug',
      method: 'get',
      handler: async (req, res) => {
        const news = await req.payload.find({
          collection: 'news',
          where: {
            slug: {
              equals: req.params.slug,
            },
          },
          limit: 1,
        })
        if (news.docs.length > 0) {
          res.status(200).send(news.docs[0])
        } else {
          res.status(404).send({ error: 'Not Found' })
        }
      },
    },
  ],
}

export default News