import React, { ReactNode } from 'react'
import { Text } from './styled'
import { Crown } from '@/components/icons/crown'
import { useTheme } from '@/hooks/useTheme'
import { Winner } from '@/components/icons/winner'
import { Flame } from '@/components/icons/flame'

interface Props {
  children: ReactNode
  colorName?: string
  iconName?: 'crown' | 'flame' | 'winner' | undefined
  iconSize?: number
  large?: boolean
}

const icons = {
  crown: Crown,
  winner: Winner,
  flame: Flame,
}

export default function TextWithIcon({
  children,
  colorName,
  iconName,
  iconSize = 20,
  large = false,
}: Props) {
  const [theme] = useTheme()
  const Icon = iconName && icons[iconName]
  const color = colorName ? theme.color[colorName] : theme.text.primary

  return (
    <Text color={color || theme.text.primary} large={large}>
      {children}
      {iconName && !!Icon && (
        <Icon
          fill={color || theme.color.primary}
          height={iconSize}
          width={iconSize}
        />
      )}
    </Text>
  )
}
