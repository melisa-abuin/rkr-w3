import React from 'react'

interface Boltrops {
  internalColor?: string
  externalColor?: string
  height?: number
  flipped?: boolean
  width?: number
}

export const Bolt = ({
  internalColor = '#000',
  externalColor = '#000',
  height = 100,
  flipped = false,
  width = 100,
}: Boltrops) => {
  const id = Math.random()

  return (
    <svg
      fill="none"
      height={height}
      role="img"
      viewBox="0 0 16 16"
      width={width}
    >
      <defs>
        <linearGradient id={`gradient${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={internalColor} />
          <stop offset="100%" stopColor={externalColor} />
        </linearGradient>
      </defs>
      <path
        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
        fill={`url(#gradient${id})`}
        transform={flipped ? 'scale(-1, 1) translate(-16, 0)' : undefined}
      />
    </svg>
  )
}
