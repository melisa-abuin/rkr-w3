'use client'

import React, { ReactNode } from 'react'
import { StyledButton } from './styled'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  as?: 'a' | 'button'
  href?: string
  target?: string
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  small?: boolean
  colorName?: 'primary' | 'secondary' | 'tertiary'
  variant?: 'outline' | 'solid' | 'ghost'
}

export default function Button({
  as = 'button',
  href,
  target,
  children,
  colorName = 'primary',
  disabled = false,
  onClick,
  small = false,
  variant = 'solid',
}: Props) {
  const [theme] = useTheme()

  if (!theme.button[colorName]) {
    console.error(
      `Button color "${colorName}" is not defined in ${theme.name} theme.`,
    )
    return null
  }

  return (
    <StyledButton
      as={as}
      href={href}
      target={target}
      {...theme.button[colorName]}
      disabled={disabled}
      onClick={onClick}
      small={small}
      variant={variant}
    >
      {children}
    </StyledButton>
  )
}
