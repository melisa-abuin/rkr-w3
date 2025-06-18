'use client'

import React, { ReactNode } from 'react'
import { Badge } from './styled'
import { useTheme } from '@/hooks/useTheme'
import { KittyColors } from '@/interfaces/player'

interface KittyColorBadgeProps {
  children: ReactNode
  colorName?: KittyColors
}

export default function KittyColorBadge({
  children,
  colorName = 'red',
}: KittyColorBadgeProps) {
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
