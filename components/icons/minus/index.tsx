import React from 'react'

interface MinusProps {
  fill?: string
  width?: number
  height?: number
}

export const Minus = ({
  fill = '#000',
  width = 100,
  height = 100,
}: MinusProps) => {
  return (
    <svg
      fill="none"
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <path
        fill={fill}
        d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.962,0-9-4.037-9-9S7.038,3,12,3s9,4.038,9,9-4.038,9-9,9Zm5-9c0,.829-.671,1.5-1.5,1.5h-7c-.829,0-1.5-.671-1.5-1.5s.671-1.5,1.5-1.5h7c.829,0,1.5.671,1.5,1.5Z"
      />
    </svg>
  )
}
