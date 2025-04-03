import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ATS SaaS',
  description: 'Applicant Tracking System SaaS',
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">Loading...</h2>
        <p className="mt-2 text-sm text-gray-600">Please wait while we load the application.</p>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
