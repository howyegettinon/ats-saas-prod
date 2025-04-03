'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ArrowLeft, Check, Infinity } from 'lucide-react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const PLANS = [
  {
    name: 'Free',
    price: '€0',
    credits: 3,
    features: [
      'Resume Analysis',
      'Cover Letter Generation',
      '3 Free Credits',
      '24-hour Support',
    ]
  },
  {
    name: 'Basic',
    price: '€9.99',
    credits: 25,
    features: [
      'Resume Analysis',
      'Cover Letter Generation',
      '25 Credits/Month',
      'Priority Support',
      'Export to PDF',
    ]
  },
  {
    name: 'Pro',
    price: '€29.99',
    credits: 'Unlimited',
    features: [
      'Resume Analysis',
      'Cover Letter Generation',
      'Unlimited Credits',
      'Priority Support',
      'Export to PDF',
      'Custom Templates',
      'API Access',
    ]
  }
]

export default function PricingPage() {
  const { data: session, status } = useSession()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePlanSelect = async (planName: string) => {
    if (!session) {
      window.location.href = '/api/auth/signin'
      return
    }

    setSelectedPlan(planName)
    setLoading(true)

    try {
      // For now, just redirect to dashboard
      // TODO: Implement Stripe checkout
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error selecting plan:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
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

        <h1 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border ${
                selectedPlan === plan.name
                  ? 'border-blue-500 ring-2 ring-blue-500'
                  : 'border-gray-100'
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <div className="text-3xl font-bold mb-6">{plan.price}</div>
              <div className="mb-6">
                <span className="text-lg font-medium">
                  {plan.credits === 'Unlimited' ? (
                    <Infinity className="inline h-6 w-6 text-blue-600 mr-2" />
                  ) : (
                    plan.credits
                  )}
                </span>
                <span className="text-gray-600">
                  {typeof plan.credits === 'number' ? ' Credits' : ''}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect(plan.name)}
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg transition-all ${
                  loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : selectedPlan === plan.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {loading ? (
                  <LoadingSpinner size="small" className="mx-auto" />
                ) : selectedPlan === plan.name ? (
                  'Selected'
                ) : (
                  'Select Plan'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
