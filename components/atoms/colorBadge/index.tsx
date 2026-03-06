'use client'

import React, { ReactNode } from 'react'
import { Badge } from './styled'
import { useTheme } from '@/hooks/useTheme'
import { BadgeColor } from '@/interfaces/theme'

interface ColorBadgeProps {
  children: ReactNode
  colorName?: BadgeColor | null
}

export default function ColorBadge({
  children,
  colorName = 'red',
}: ColorBadgeProps) {
  const [theme] = useTheme()

  if (!colorName) {
    return null
  }

  if (!theme.badge[colorName]) {
    console.error(
      `Badge color "${colorName}" is not defined in ${theme.name} theme.`,
    )
    return null
  }

  return <Badge {...theme.badge[colorName]}>{children}</Badge>
}
