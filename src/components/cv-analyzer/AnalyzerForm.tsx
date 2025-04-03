'use client'

import { useState } from 'react'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import CopyButton from '@/components/ui/CopyButton'
import CharacterCounter from '@/components/ui/CharacterCounter'

export default function AnalyzerForm() {
  const [resume, setResume] = useState('')
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resume.trim()) return
    
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }
      
      setAnalysis(data.result)
    } catch (error: any) {
      console.error('Error:', error)
      setError(error.message)
      setAnalysis(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="space-y-2">
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-96 bg-white/50 rounded-xl p-6 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Paste your resume here..."
              disabled={loading}
            />
            <CharacterCounter current={resume.length} />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Resume</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-8 bg-red-50 text-red-600 rounded-2xl p-6 border border-red-200">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analysis Results
            </h2>
            <CopyButton text={analysis} />
          </div>
          <div className="prose prose-blue max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 rounded-xl p-6">
              {analysis}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
