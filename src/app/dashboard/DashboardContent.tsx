'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Menu, X } from 'lucide-react'
import { formatDate } from '@/utils/dateFormat'

const navigation = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'CV Analyzer', href: '/dashboard/cv-analyzer' },
  { name: 'Cover Letter', href: '/dashboard/cover-letter' },
  { name: 'History', href: '/history' },
]

export default function DashboardContent() {
  const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const currentTime = formatDate(new Date())

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                CVGenius
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                {session?.user?.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 40px) 100vw, 40px"
                      priority
                      unoptimized // Added to help with Google profile images
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">
                    {session?.user?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {session?.user?.email}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Sign out
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 flex items-center">
              {session?.user?.image && (
                <div className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ring-2 ring-white">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 40px) 100vw, 40px"
                    priority
                    unoptimized
                  />
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {session?.user?.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {session?.user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <button
                onClick={() => signOut()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Sign out
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Activity Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="text-sm text-gray-500">
              Last updated: {currentTime}
            </div>
          </div>

          {/* Credits Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Credits</h2>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">10</span>
              <span className="text-sm text-gray-500">Remaining</span>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/cv-analyzer"
                className="block w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Analyze Resume
              </Link>
              <Link
                href="/dashboard/cover-letter"
                className="block w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
              >
                Generate Cover Letter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
