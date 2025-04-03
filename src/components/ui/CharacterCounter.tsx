interface CharacterCounterProps {
  current: number
  max?: number
}

export default function CharacterCounter({ current, max }: CharacterCounterProps) {
  return (
    <div className="text-xs text-gray-500">
      {max ? (
        <span>{current.toLocaleString()} / {max.toLocaleString()} characters</span>
      ) : (
        <span>{current.toLocaleString()} characters</span>
      )}
    </div>
  )
}
