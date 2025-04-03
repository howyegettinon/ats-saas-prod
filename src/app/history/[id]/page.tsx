'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '@/utils/dateFormat'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import CopyButton from '@/components/ui/CopyButton'

type HistoryDetail = {
  id: string
  resume: string
  result?: string
  coverLetter?: string
  jobDescription?: string
  createdAt: string
}

export default function HistoryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [detail, setDetail] = useState<HistoryDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/history/${params.id}?type=${type}`)
        if (!response.ok) throw new Error('Failed to fetch details')
        const data = await response.json()
        setDetail(data)
      } catch (err) {
        console.error('Error fetching details:', err)
        setError('Failed to load details')
      } finally {
        setLoading(false)
      }
    }

    if (params.id && type) {
      fetchDetail()
    }
  }, [params.id, type])

  if (!type) {
    router.push('/history')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/history"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to History
          </Link>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          {type === 'analysis' ? 'CV Analysis' : 'Cover Letter'} Details
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">{error}</div>
        ) : detail ? (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="text-sm text-gray-500 mb-4">
                {formatDate(detail.createdAt)}
              </div>
              
              {type === 'analysis' ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{detail.result}</p>
                  </div>
                  <div className="mt-4">
                    <CopyButton text={detail.result || ''} />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{detail.coverLetter}</p>
                  </div>
                  <div className="mt-4">
                    <CopyButton text={detail.coverLetter || ''} />
                  </div>
                </>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Original Resume</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{detail.resume}</p>
              </div>
              <div className="mt-4">
                <CopyButton text={detail.resume} />
              </div>
            </div>

            {type === 'cover-letter' && detail.jobDescription && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{detail.jobDescription}</p>
                </div>
                <div className="mt-4">
                  <CopyButton text={detail.jobDescription} />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
