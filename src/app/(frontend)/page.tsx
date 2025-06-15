'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  BookOpen,
  Users,
  Newspaper,
  Calendar,
  Layers,
  Megaphone,
  Bookmark,
  School,
  FileText
} from 'lucide-react'

interface Department {
  id: string
  name: string
  description: string
  image?: {
    url: string
  }
}

interface Teacher {
  id: string
  name: string
  position: string
  photo?: {
    url: string
  }
}

interface News {
  id: string
  title: string
  excerpt: string
  publishDate: string
  featuredImage?: {
    url: string
  }
}

interface Event {
  id: string
  title: string
  startDate: string
  location: string
}

interface Announcement {
  id: string
  title: string
  publishDate: string
}

export default function Beranda() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [news, setNews] = useState<News[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [deptRes, teachRes, newsRes, eventsRes, announceRes] = await Promise.all([
          fetch('/api/departments?limit=3'),
          fetch('/api/teachers?limit=4'),
          fetch('/api/news?limit=3&sort=-publishDate'),
          fetch('/api/events?limit=3&sort=startDate'),
          fetch('/api/announcements?limit=3&sort=-publishDate')
        ])

        const [deptData, teachData, newsData, eventsData, announceData] = await Promise.all([
          deptRes.json(),
          teachRes.json(),
          newsRes.json(),
          eventsRes.json(),
          announceRes.json()
        ])

        setDepartments(deptData.docs)
        setTeachers(teachData.docs)
        setNews(newsData.docs)
        setEvents(eventsData.docs)
        setAnnouncements(announceData.docs)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Selamat Datang di SMK Negeri 1 Adiwerna
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Sekolah Kejuruan Unggulan dengan Berbagai Program Kompetensi
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 mr-4">
              Jelajahi Sekolah
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
              Kontak Kami
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Menu Utama</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-blue-50 p-6 rounded-lg text-center cursor-pointer transition-all"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800">Jurusan</h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-green-50 p-6 rounded-lg text-center cursor-pointer transition-all"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800">Guru</h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-purple-50 p-6 rounded-lg text-center cursor-pointer transition-all"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800">Berita</h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-yellow-50 p-6 rounded-lg text-center cursor-pointer transition-all"
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800">Agenda</h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-red-50 p-6 rounded-lg text-center cursor-pointer transition-all"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="text-red-600 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800">Pengumuman</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Jurusan Kami</h2>
            <a href="/departments" className="text-blue-600 hover:underline flex items-center">
              Lihat Semua <Layers className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {dept.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={dept.image.url} 
                      alt={dept.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{dept.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{dept.description}</p>
                  <button className="text-blue-600 hover:underline font-medium">
                    Pelajari Lebih Lanjut →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Berita Terkini</h2>
            <a href="/news" className="text-blue-600 hover:underline flex items-center">
              Lihat Semua <Newspaper className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {item.featuredImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.featuredImage.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(item.publishDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                  <button className="text-blue-600 hover:underline font-medium">
                    Baca Selengkapnya →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Announcements Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Events */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Agenda Mendatang</h2>
                <a href="/events" className="text-blue-600 hover:underline flex items-center">
                  Lihat Semua <Calendar className="ml-2 w-4 h-4" />
                </a>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                {events.length > 0 ? (
                  <ul className="space-y-4">
                    {events.map((event) => (
                      <motion.li
                        key={event.id}
                        whileHover={{ x: 5 }}
                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-600 rounded-lg p-3 mr-4 flex-shrink-0">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{event.title}</h3>
                            <div className="text-sm text-gray-500 mt-1">
                              {new Date(event.startDate).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                            {event.location && (
                              <div className="text-sm text-gray-500 mt-1 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada agenda mendatang
                  </div>
                )}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Pengumuman Terbaru</h2>
                <a href="/announcements" className="text-blue-600 hover:underline flex items-center">
                  Lihat Semua <Megaphone className="ml-2 w-4 h-4" />
                </a>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                {announcements.length > 0 ? (
                  <ul className="space-y-4">
                    {announcements.map((announcement) => (
                      <motion.li
                        key={announcement.id}
                        whileHover={{ x: 5 }}
                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start">
                          <div className="bg-red-100 text-red-600 rounded-lg p-3 mr-4 flex-shrink-0">
                            <Megaphone className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                            <div className="text-sm text-gray-500 mt-1">
                              {new Date(announcement.publishDate).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada pengumuman terbaru
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Guru & Staff</h2>
            <a href="/teachers" className="text-blue-600 hover:underline flex items-center">
              Lihat Semua <Users className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  {teacher.photo ? (
                    <img 
                      src={teacher.photo.url} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                      <Users className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                <p className="text-sm text-gray-600">{teacher.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SMK Negeri 1 Adiwerna</h3>
              <p className="text-gray-300 mb-4">
                Jl. Raya Adiwerna No. 123, Kabupaten Tegal, Jawa Tengah
              </p>
              <div className="space-y-2">
                <p className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (0283) 123456
                </p>
                <p className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@smkn1adiwerna.sch.id
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Tautan Cepat</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Beranda</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Profil Sekolah</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Jurusan</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Guru & Staff</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Berita</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Jurusan</h4>
              <ul className="space-y-2">
                {departments.slice(0, 5).map((dept) => (
                  <li key={dept.id}>
                    <a href="#" className="text-gray-300 hover:text-white">{dept.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Media Sosial</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SMK Negeri 1 Adiwerna. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}