import React, { ReactNode } from 'react'
import { Text } from './styled'
import { Crown } from '@/components/icons/crown'
import { useTheme } from '@/hooks/useTheme'
import { Winner } from '@/components/icons/winner'
import { Flame } from '@/components/icons/flame'
import { Clock } from '@/components/icons/clock'
import { Paw } from '@/components/icons/paw'

interface Props {
  children: ReactNode
  colorName?: string
  iconName?: 'clock' | 'crown' | 'flame' | 'paw' | 'winner' | undefined
  iconSize?: number
  large?: boolean
  palette?: 'color' | 'text'
}

const icons = {
  clock: Clock,
  crown: Crown,
  paw: Paw,
  winner: Winner,
  flame: Flame,
}

export default function TextWithIcon({
  children,
  colorName = 'primary',
  iconName,
  iconSize = 20,
  large = false,
  palette = 'text',
}: Props) {
  const [theme] = useTheme()
  const Icon = iconName && icons[iconName]
  const color = theme[palette][colorName]

  return (
    <Text color={color || theme.text.primary} large={large}>
      {children}
      {iconName && !!Icon && (
        <Icon
          fill={color || theme.text.primary}
          height={iconSize}
          width={iconSize}
        />
      )}
    </Text>
  )
}
