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
  // TODO: refactor to match text with color and link color styling
  const [theme] = useTheme()
  const backgroundColor =
    color === 'primary' ? theme.color.primary : theme.color.secondary
  const textColor = color === 'primary' ? theme.text.white : theme.text.black
  const highlightColor =
    color === 'primary' ? theme.text.tertiary : theme.text.highlight

  return (
    <StyledButton
      backgroundColor={backgroundColor}
      color={textColor}
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
