import React, { ReactNode, useState } from 'react'
import { StyledTooltip, TooltipContainer } from './styled'

interface Props {
  ariaLabel?: string
  body: ReactNode
  children: ReactNode
}

export default function Tooltip({ ariaLabel, body, children }: Props) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY })
  }

  return (
    <TooltipContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
      aria-label={ariaLabel || 'Tooltip'}
    >
      {children}

      <StyledTooltip
        showTooltip={showTooltip}
        x={coords.x}
        y={coords.y}
        role="tooltip"
      >
        {body}
      </StyledTooltip>
    </TooltipContainer>
  )
}
