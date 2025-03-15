'use client'

import React, { ReactNode } from 'react'
import { StyledButton } from './styled'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  children: ReactNode
  color?: 'primary' | 'secondary'
  disabled?: boolean
  onClick: () => void
  small?: boolean
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  color = 'primary',
  disabled = false,
  onClick,
  small = false,
  variant = 'primary',
}: Props) {
  const [theme] = useTheme()
  const mainColor =
    color === 'primary' ? theme.color.primary : theme.color.secondary
  const highlightColor =
    color === 'primary' ? theme.text.tertiary : theme.text.highlight

  return (
    <StyledButton
      color={mainColor}
      highlightColor={highlightColor}
      disabled={disabled}
      onClick={onClick}
      small={small}
      variant={variant}
    >
      {children}
    </StyledButton>
  )
}
