'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '@/utils/dateFormat'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

type HistoryItem = {
  id: string
  resume: string
  result?: string
  coverLetter?: string
  jobDescription?: string
  createdAt: string
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'cover-letter'>('analysis')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useState(() => {
    fetchHistory()
  }, [activeTab])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/history?type=${activeTab}`)
      if (!response.ok) throw new Error('Failed to fetch history')
      const data = await response.json()
      setHistory(data.items)
    } catch (err) {
      console.error('Error fetching history:', err)
      setError('Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Your History
        </h1>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'analysis'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              CV Analysis
            </button>
            <button
              onClick={() => setActiveTab('cover-letter')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'cover-letter'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cover Letters
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : history.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No {activeTab === 'analysis' ? 'CV analyses' : 'cover letters'} found
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </div>
                    <button
                      onClick={() => window.location.href = `/history/${item.id}?type=${activeTab}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
                    >
                      View Details →
                    </button>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <h3 className="text-lg font-semibold mb-2">
                      {activeTab === 'analysis' ? 'CV Analysis' : 'Cover Letter'}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {activeTab === 'analysis'
                        ? item.result?.substring(0, 200)
                        : item.coverLetter?.substring(0, 200)}
                      ...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
