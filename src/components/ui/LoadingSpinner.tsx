export default function LoadingSpinner({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    default: 'h-6 w-6 border-2',
    large: 'h-8 w-8 border-3'
  }

  return (
    <div className="inline-flex items-center justify-center">
      <div 
        className={`animate-spin rounded-full border-blue-600 border-r-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}
