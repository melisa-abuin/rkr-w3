import React from 'react'

interface IconProps {
  fill?: string
  width?: number
  height?: number
}

export const Brand = ({
  fill = '#000',
  width = 100,
  height = 100,
}: IconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        fill={fill}
      />
    </svg>
  )
}
