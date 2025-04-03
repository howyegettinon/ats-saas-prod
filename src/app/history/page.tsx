'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatDate } from '@/utils/dateFormat'

type HistoryItem = {
  id: string
  resume: string
  result: string
  createdAt: string
  type: 'analysis' | 'coverletter'
  jobDescription?: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history')
        if (!response.ok) throw new Error('Failed to fetch history')
        const data = await response.json()
        
        // Combine and sort analyses and cover letters
        const combinedHistory = [
          ...data.analyses.map((a: any) => ({ ...a, type: 'analysis' })),
          ...data.coverLetters.map((c: any) => ({ ...c, type: 'coverletter' }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        
        setHistory(combinedHistory)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history')
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Your History</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 rounded-xl p-6">
          <p>{error}</p>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No history found. Start by analyzing a resume or generating a cover letter!
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {item.type === 'analysis' ? 'Resume Analysis' : 'Cover Letter'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => {/* TODO: Implement view details */}}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {item.result}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
