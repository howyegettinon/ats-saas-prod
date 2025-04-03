'use client'

import { useEffect, useState } from 'react'
import { Infinity } from 'lucide-react'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'

export default function CreditDisplay() {
  const [credits, setCredits] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        // Use absolute URL to avoid path issues
        const response = await fetch('/api/subscription', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch credits: ${response.statusText}`)
        }
        
        const data = await response.json()
        setCredits(data.credits)
      } catch (err) {
        console.error('Error fetching credits:', err)
        setError(err instanceof Error ? err.message : 'Error loading credits')
      }
    }

    fetchCredits()
  }, [])

  if (error) {
    console.error('CreditDisplay error:', error)
    return null
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-blue-600">
          {credits === null ? (
            <LoadingSpinner size="small" className="text-blue-600" />
          ) : credits === -1 ? (
            <Infinity className="h-8 w-8" />
          ) : (
            credits
          )}
        </span>
        <span className="text-sm text-gray-500">Credits</span>
      </div>
      {credits !== null && credits !== -1 && credits < 5 && (
        <Link 
          href="/pricing" 
          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          Get more →
        </Link>
      )}
    </div>
  )
}
