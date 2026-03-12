import React from 'react'

interface ClockProps {
  fill?: string
  width?: number
  height?: number
}

export const Clock = ({
  fill = '#000',
  width = 100,
  height = 100,
}: ClockProps) => {
  return (
    <svg
      fill="none"
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <path
        d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-21C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.963,3,12,3Zm5,9.5c0-.828-.672-1.5-1.5-1.5h-2.5V6.5c0-.828-.671-1.5-1.5-1.5s-1.5,.672-1.5,1.5v6c0,.828,.671,1.5,1.5,1.5h4c.828,0,1.5-.672,1.5-1.5Z"
        fill={fill}
      />
    </svg>
  )
}
