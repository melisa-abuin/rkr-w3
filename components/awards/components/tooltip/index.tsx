import React, { ReactNode } from 'react'
import { StyledTooltip, TooltipContainer } from './styled'

interface Props {
  children?: ReactNode
}

export default function Tooltip({ children }: Props) {
  return (
    <TooltipContainer aria-label="Award details">
      {children}

      <StyledTooltip role="tooltip">Description</StyledTooltip>
    </TooltipContainer>
  )
}
