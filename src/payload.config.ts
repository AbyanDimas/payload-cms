// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import collections by category

// 1. Core Collections
import { Users } from './collections/Users'
import Media from './collections/Media'

// 2. Academic Collections
import Departments from './collections/Departments'
import Teachers from './collections/Teachers'
import Documents from './collections/Documents'
import Extracurriculars from './collections/Extracurriculars'
import Achievements from './collections/Achievements'

// 3. Content Collections
import News from './collections/News'
import Events from './collections/Events'
import Announcements from './collections/Announcements'
import Gallery from './collections/Gallery'

// 4. Institutional Collections
import OrganizationStructure from './collections/OrganizationStructure'
import SchoolProfile from './collections/SchoolProfile'
import VisionMission from './collections/VisionMission'
import AboutPage from './collections/AboutPage'
import ContactInfo from './collections/ContactInfo'
import SocialMedia from './collections/SocialMedia'

// 5. Partnership Collections
import Partners from './collections/Partners'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Core Collections
    Users,
    Media,
    
    // Academic Collections
    Departments,
    Teachers,
    Documents,
    Extracurriculars,
    Achievements,
    
    // Content Collections
    News,
    Events,
    Announcements,
    Gallery,
    
    // Institutional Collections
    OrganizationStructure,
    
    
    // Partnership Collections
    Partners,
  ],
    globals: [ContactInfo, VisionMission, SchoolProfile, AboutPage, SocialMedia],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})