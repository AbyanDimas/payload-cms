'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { 
  BookOpen, 
  ChevronRight, 
  Home, 
  Wrench, 
  HardHat, 
  Zap, 
  Cpu, 
  Radio, 
  Layers,
  ArrowLeft,
  Calendar,
  User,
  Briefcase,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Building2,
  Trophy,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

interface Program {
  programName: string
  programDescription: string
  id: string
}

interface Department {
  id: string
  name: string
  description: string
  image: {
    url: string
  }
  programs: Program[]
  createdAt: string
  head?: {
    name: string
    position: string
    photo?: {
      url: string
    }
  }
  facilities?: string[]
  achievements?: string[]
  industryPartners?: string[]
  studentCount?: number
  labCount?: number
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'facilities'>('overview')

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments?limit=10')
        const data = await response.json()
        if (response.ok) {
          // Simulate enriched data for demo
          const enrichedData = data.docs.map((dept: Department) => ({
            ...dept,
            studentCount: Math.floor(Math.random() * 500) + 100,
            labCount: Math.floor(Math.random() * 5) + 2,
            head: {
              name: `Dr. ${dept.name.split(' ')[0]} S.T., M.T.`,
              position: `Kepala Jurusan ${dept.name}`,
              photo: { url: '/default-avatar.jpg' }
            },
            facilities: [
              `Lab ${dept.name.split(' ')[0]} Modern`,
              'Workshop Praktik',
              'Perangkat Lunak Terbaru',
              'Simulator Industri'
            ],
            achievements: [
              'Juara 1 LKS Tingkat Provinsi 2023',
              'Akreditasi A',
              'Sertifikasi ISO 9001:2022'
            ],
            industryPartners: [
              'PT. Industri Nasional',
              'PT. Teknologi Maju',
              'PT. Solusi Digital'
            ]
          }))
          setDepartments(enrichedData)
        } else {
          setError('Failed to load department data')
        }
      } catch (err) {
        setError('Error fetching data')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  const getDepartmentIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('mesin')) return <Wrench className="w-6 h-6" />
    if (lowerName.includes('otomotif')) return <HardHat className="w-6 h-6" />
    if (lowerName.includes('listrik')) return <Zap className="w-6 h-6" />
    if (lowerName.includes('elektronik')) return <Radio className="w-6 h-6" />
    if (lowerName.includes('jaringan')) return <Cpu className="w-6 h-6" />
    if (lowerName.includes('bangunan')) return <Layers className="w-6 h-6" />
    return <BookOpen className="w-6 h-6" />
  }

  const getDepartmentColor = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('mesin')) return 'bg-orange-500'
    if (lowerName.includes('otomotif')) return 'bg-blue-500'
    if (lowerName.includes('listrik')) return 'bg-yellow-500'
    if (lowerName.includes('elektronik')) return 'bg-purple-500'
    if (lowerName.includes('jaringan')) return 'bg-green-500'
    if (lowerName.includes('bangunan')) return 'bg-red-500'
    return 'bg-indigo-500'
  }

  const toggleProgram = (id: string) => {
    setExpandedProgram(expandedProgram === id ? null : id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full"
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Data</h3>
            <p className="mt-1 text-gray-500">{error}</p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Jurusan | SMK Negeri 1 Adiwerna</title>
        <meta name="description" content="Program jurusan unggulan SMK Negeri 1 Adiwerna" />
      </Head>

      {/* Floating Action Button */}
      {selectedDept && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDept(null)}
          className="fixed bottom-6 right-6 z-10 bg-white p-4 rounded-full shadow-xl border border-gray-200 hover:shadow-2xl transition-all"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </motion.button>
      )}

      <LayoutGroup>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!selectedDept ? (
            <>
              {/* Departments List View */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Program Jurusan Unggulan
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                  Temukan jurusan yang sesuai dengan passion dan bakat Anda
                </p>
              </motion.div>

              <motion.div
                layout
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {departments.map((dept) => {
                  const colorClass = getDepartmentColor(dept.name)
                  return (
                    <motion.div
                      key={dept.id}
                      layoutId={`card-${dept.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => setSelectedDept(dept)}
                    >
                      <div className="relative h-56">
                        {dept.image?.url ? (
                          <img
                            className="w-full h-full object-cover"
                            src={dept.image.url}
                            alt={dept.name}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <BookOpen className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                          <div className="flex items-center">
                            <div className={`p-3 rounded-xl ${colorClass} text-white shadow-md`}>
                              {getDepartmentIcon(dept.name)}
                            </div>
                            <h3 className="ml-4 text-2xl font-bold text-white drop-shadow-md">{dept.name}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {dept.description.split('\n')[0]}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <GraduationCap className="mr-1 h-3 w-3" />
                              {dept.studentCount}+ Siswa
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Settings className="mr-1 h-3 w-3" />
                              {dept.labCount} Lab
                            </span>
                          </div>
                          <div className="flex items-center text-sm font-medium text-blue-600">
                            Selengkapnya
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {departments.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Tidak ada jurusan tersedia</h3>
                  <p className="mt-2 text-gray-500">Silakan coba lagi nanti.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Refresh
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Department Detail View */}
              <motion.div
                layoutId={`card-${selectedDept.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Department Hero */}
                <div className="relative h-96 w-full">
                  {selectedDept.image?.url ? (
                    <img
                      className="w-full h-full object-cover"
                      src={selectedDept.image.url}
                      alt={selectedDept.name}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <BookOpen className="h-20 w-20 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex items-end">
                      <div className={`p-4 rounded-xl ${getDepartmentColor(selectedDept.name)} text-white shadow-lg`}>
                        {getDepartmentIcon(selectedDept.name)}
                      </div>
                      <div className="ml-6 mb-2">
                        <motion.h1 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-4xl font-bold text-white"
                        >
                          {selectedDept.name}
                        </motion.h1>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center text-white/90 mt-2"
                        >
                          <Calendar className="h-5 w-5 mr-1" />
                          <span>
                            Diperbarui: {new Date(selectedDept.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Content */}
                <div className="px-8 py-8">
                  {/* Stats Bar */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                  >
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center">
                        <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Siswa Aktif</p>
                          <p className="text-xl font-bold text-gray-900">{selectedDept.studentCount}+</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="flex items-center">
                        <Settings className="h-6 w-6 text-green-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Laboratorium</p>
                          <p className="text-xl font-bold text-gray-900">{selectedDept.labCount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="flex items-center">
                        <Award className="h-6 w-6 text-purple-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Prestasi</p>
                          <p className="text-xl font-bold text-gray-900">{selectedDept.achievements?.length || 0}+</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <div className="flex items-center">
                        <Building2 className="h-6 w-6 text-orange-600 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Mitra Industri</p>
                          <p className="text-xl font-bold text-gray-900">{selectedDept.industryPartners?.length || 0}+</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tabs */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="border-b border-gray-200 mb-6"
                  >
                    <nav className="-mb-px flex space-x-8">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('programs')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'programs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      >
                        Program Unggulan
                      </button>
                      <button
                        onClick={() => setActiveTab('facilities')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'facilities' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                      >
                        Fasilitas
                      </button>
                    </nav>
                  </motion.div>

                  {/* Tab Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="prose max-w-none">
                        {selectedDept.description.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4 text-gray-700">{paragraph}</p>
                        ))}

                        {/* Department Head */}
                        <div className="mt-12 bg-gray-50 rounded-xl p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Kepala Jurusan</h3>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow">
                              {selectedDept.head?.photo?.url ? (
                                <img 
                                  src={selectedDept.head.photo.url} 
                                  alt={selectedDept.head.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <User className="h-8 w-8 text-gray-400 m-4" />
                              )}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-medium text-gray-900">{selectedDept.head?.name}</h4>
                              <p className="text-gray-600">{selectedDept.head?.position}</p>
                            </div>
                          </div>
                        </div>

                        {/* Industry Partners */}
                        <div className="mt-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Mitra Industri</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {selectedDept.industryPartners?.map((partner, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ y: -2 }}
                                className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center justify-center"
                              >
                                <span className="text-gray-800 font-medium text-center">{partner}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'programs' && (
                      <div>
                        {selectedDept.programs && selectedDept.programs.length > 0 ? (
                          <div className="space-y-4">
                            {selectedDept.programs.map((program) => (
                              <motion.div
                                key={program.id}
                                layout
                                className="border border-gray-200 rounded-xl overflow-hidden"
                              >
                                <motion.button
                                  layout
                                  onClick={() => toggleProgram(program.id)}
                                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition"
                                >
                                  <div className="flex items-start">
                                    <div className={`p-2 rounded-lg ${getDepartmentColor(selectedDept.name)} text-white mr-4`}>
                                      <Trophy className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                      <h3 className="text-lg font-medium text-gray-900">
                                        {program.programName}
                                      </h3>
                                    </div>
                                  </div>
                                  {expandedProgram === program.id ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                  )}
                                </motion.button>
                                <AnimatePresence>
                                  {expandedProgram === program.id && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-6 pb-6 pt-2">
                                        <p className="text-gray-700">{program.programDescription}</p>
                                        <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                          Lihat Detail Program
                                          <ExternalLink className="ml-2 h-4 w-4" />
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Belum ada program unggulan</h3>
                            <p className="mt-1 text-gray-500">Informasi akan segera diupdate</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'facilities' && (
                      <div>
                        {selectedDept.facilities && selectedDept.facilities.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedDept.facilities.map((facility, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ y: -4 }}
                                className="bg-white p-6 rounded-xl shadow border border-gray-100"
                              >
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                    <CheckCircle className="h-6 w-6" />
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">{facility}</h3>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Settings className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Belum ada informasi fasilitas</h3>
                            <p className="mt-1 text-gray-500">Informasi akan segera diupdate</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </main>
      </LayoutGroup>
    </div>
  )
}