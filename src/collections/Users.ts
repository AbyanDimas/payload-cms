import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
    defaultColumns: ['email', 'name', 'roles', 'status'],
    hideAPIURL: true,
  },
  auth: {
    tokenExpiration: 7200, // 2 hours
    lockTime: 600, // 10 minutes
    maxLoginAttempts: 5,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Teacher',
          value: 'teacher',
        },
        {
          label: 'Staff',
          value: 'staff',
        },
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'Guest',
          value: 'guest',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: {
        condition: (data) => {
          return data?.roles?.includes('teacher') || data?.roles?.includes('staff')
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
        {
          label: 'Suspended',
          value: 'suspended',
        },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor'))
    },
    update: async ({ req: { user }, id }) => { // Made this function async
      // Admins can update anyone
      if (user?.roles?.includes('admin')) return true
      
      // Editors can update other editors and below
      if (user?.roles?.includes('editor')) {
        if (!id) return true // allow creation
        const targetUser = await req.payload.findByID({ collection: 'users', id }) // Now properly awaited
        return !targetUser?.roles?.includes('admin')
      }
      
      // Users can only update themselves
      return user?.id === id
    },
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
    admin: ({ req: { user } }) => {
      return Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor'))
    },
    unlock: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        try {
          await req.payload.update({
            collection: 'users',
            id: user.id,
            data: {
              lastLogin: new Date(),
            },
          })
        } catch (error) {
          console.error('Error updating last login:', error)
        }
      },
    ],
  },
  endpoints: [
    {
      path: '/me',
      method: 'get',
      handler: async (req, res) => {
        if (!req.user) {
          return res.status(401).send({ error: 'Unauthorized' })
        }
        
        try {
          const user = await req.payload.findByID({
            collection: 'users',
            id: req.user.id,
            depth: 1,
          })
          
          return res.status(200).send(user)
        } catch (error) {
          console.error('Error fetching user:', error)
          return res.status(500).send({ error: 'Internal Server Error' })
        }
      },
    },
  ],
}