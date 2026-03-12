'use client'

import React, { ReactNode } from 'react'
import { StyledLink } from './styled'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  children: ReactNode
  color?: string
  download?: string
  href: string
  onClick?: () => void
  rel?: string
  target?: '_self' | '_blank'
}

export default function Link({
  children,
  color = 'primary',
  download,
  href,
  onClick,
  rel,
  target = '_self',
}: Props) {
  const [theme] = useTheme()
  const colorName = theme.text.color[color]
  const hoverColor = theme.text.hover[color]

  if (!colorName || !hoverColor) {
    console.error(
      `Text color "${color}" is not defined in ${theme.name} theme.`,
    )
    return null
  }

  return (
    <StyledLink
      color={colorName}
      hoverColor={hoverColor}
      download={download}
      href={href}
      onClick={onClick}
      rel={rel}
      target={target}
    >
      {children}
    </StyledLink>
  )
}
