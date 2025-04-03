import { Check, Infinity } from 'lucide-react'
import LoadingSpinner from '../ui/LoadingSpinner'

type PricingCardProps = {
  name: string
  price: string
  credits: number | 'Unlimited'
  features: string[]
  selected: boolean
  loading: boolean
  onSelect: () => void
}

export default function PricingCard({
  name,
  price,
  credits,
  features,
  selected,
  loading,
  onSelect
}: PricingCardProps) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border ${
        selected
          ? 'border-blue-500 ring-2 ring-blue-500'
          : 'border-gray-100'
      }`}
    >
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <div className="text-3xl font-bold mb-6">{price}</div>
      <div className="mb-6">
        <span className="text-lg font-medium">
          {credits === 'Unlimited' ? (
            <Infinity className="inline h-6 w-6 text-blue-600 mr-2" />
          ) : (
            credits
          )}
        </span>
        <span className="text-gray-600">
          {typeof credits === 'number' ? ' Credits' : ''}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-600">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg transition-all ${
          loading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : selected
            ? 'bg-blue-600 text-white'
            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
        }`}
      >
        {loading ? (
          <LoadingSpinner size="small" className="mx-auto" />
        ) : selected ? (
          'Selected'
        ) : (
          'Select Plan'
        )}
      </button>
    </div>
  )
}
