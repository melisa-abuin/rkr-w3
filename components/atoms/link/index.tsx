'use client'

import React, { ReactNode } from 'react'
import { StyledLink } from './styled'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  children: ReactNode
  colorName?: string
  download?: string
  href: string
  onClick?: () => void
  rel?: string
  target?: '_self' | '_blank'
  withButtonStyle?: boolean
}

export default function Link({
  children,
  colorName,
  download,
  href,
  onClick,
  rel,
  target = '_self',
  withButtonStyle = false,
}: Props) {
  const [theme] = useTheme()
  const color = colorName ? theme.text[colorName] : theme.text.primary

  return (
    <StyledLink
      color={color || theme.text.primary}
      download={download}
      href={href}
      onClick={onClick}
      rel={rel}
      target={target}
      withButtonStyle={withButtonStyle}
    >
      {children}
    </StyledLink>
  )
}
