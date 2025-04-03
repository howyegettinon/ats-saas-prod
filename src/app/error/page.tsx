'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <div className="mt-4">
          <p className="text-gray-600">Error details:</p>
          <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto">
            {error || 'Unknown error'}
          </pre>
        </div>
        <div className="mt-6">
          <a
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Loading...</h2>
          <p className="mt-2 text-sm text-gray-600">Please wait while we process your request.</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
