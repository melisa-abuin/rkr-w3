import React from 'react'

interface WingProps {
  internalColor?: string
  externalColor?: string
  height?: number
  flipped?: boolean
  width?: number
}

export const Wing = ({
  internalColor = '#000',
  externalColor = '#000',
  height = 100,
  flipped = false,
  width = 100,
}: WingProps) => {
  const id = Math.random()
  return (
    <svg
      fill="none"
      height={height}
      role="img"
      viewBox="0 0 122.88 121.46"
      width={width}
    >
      <defs>
        <linearGradient id={`gradient${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={internalColor} />
          <stop offset="100%" stopColor={externalColor} />
        </linearGradient>
      </defs>
      <path
        d="M12.35,121.46c-8.01-9.72-11.92-19.29-12.31-28.71C-0.78,73.01,10.92,58.28,28.3,47.67 c18.28-11.16,37.08-13.93,55.36-22.25C92.79,21.27,103.68,14.47,121.8,0c5.92,15.69-12.92,40.9-43.52,54.23 c9.48,0.37,19.69-2.54,30.85-9.74c-0.76,19.94-16.46,32.21-51.3,36.95c7.33,2.45,16.09,2.58,27.27-0.58 C74.33,116.81,29.9,91.06,12.35,121.46L12.35,121.46z"
        fill={`url(#gradient${id})`}
        transform={flipped ? 'scale(-1, 1) translate(-122.88, 0)' : undefined}
      />
    </svg>
  )
}
