'use client'

import React, { ReactNode } from 'react'
import { StyledButton } from './styled'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
  small?: boolean
  color?: 'primary' | 'secondary'
  variant?: 'outline' | 'solid' | 'ghost'
}

export default function Button({
  children,
  color = 'primary',
  disabled = false,
  onClick,
  small = false,
  variant = 'solid',
}: Props) {
  const [theme] = useTheme()

  if (!theme.button[color]) {
    console.error(
      `Button color "${color}" is not defined in ${theme.name} theme.`,
    )
    return null
  }

  return (
    <StyledButton
      {...theme.button[color]}
      disabled={disabled}
      onClick={onClick}
      small={small}
      variant={variant}
    >
      {children}
    </StyledButton>
  )
}
