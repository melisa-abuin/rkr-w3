import React, { ReactNode } from 'react'
import { Description, StyledTooltip, Title, TooltipContainer } from './styled'

interface Props {
  children?: ReactNode
  description: string
  title: string
}

export default function Tooltip({ children, description, title }: Props) {
  return (
    <TooltipContainer aria-label="Award details">
      {children}

      <StyledTooltip role="tooltip">
        <Title>{title}</Title>
        <Description>{description}</Description>
      </StyledTooltip>
    </TooltipContainer>
  )
}
