'use client'

import React, { ReactNode } from 'react'
import { StyledButton } from './styled'

interface Props {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  disabled = false,
  onClick,
  variant = 'primary',
}: Props) {
  return (
    <StyledButton disabled={disabled} onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  )
}
