interface CharacterCounterProps {
  current: number
  max?: number
}

export default function CharacterCounter({ current, max }: CharacterCounterProps) {
  if (!max) {
    return (
      <div className="text-sm text-gray-500">
        Characters: {current.toLocaleString()}
      </div>
    )
  }

  const isNearLimit = current > max * 0.9
  const isOverLimit = current > max

  return (
    <div className={`text-sm ${
      isOverLimit 
        ? 'text-red-600' 
        : isNearLimit 
          ? 'text-amber-600' 
          : 'text-gray-500'
    }`}>
      Characters: {current.toLocaleString()} / {max.toLocaleString()}
    </div>
  )
}
