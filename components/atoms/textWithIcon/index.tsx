import React, { ReactNode } from 'react'
import { Text } from './styled'
import { Crown } from '@/components/icons/crown'
import { useTheme } from '@/hooks/useTheme'
import { Winner } from '@/components/icons/winner'
import { Flame } from '@/components/icons/flame'
import { Clock } from '@/components/icons/clock'
import { Paw } from '@/components/icons/paw'
import { Information } from '@/components/icons/information'

interface Props {
  children: ReactNode
  colorName?: string
  iconName?:
    | 'clock'
    | 'crown'
    | 'flame'
    | 'paw'
    | 'winner'
    | 'information'
    | undefined
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
  information: Information,
}

export default function TextWithIcon({
  children,
  colorName = 'primary',
  iconName,
  iconSize = 20,
  large = false,
}: Props) {
  const [theme] = useTheme()
  const Icon = iconName && icons[iconName]
  const color = theme.text.color[colorName]

  if (!color) {
    console.error(
      `Text color "${color}" is not defined in ${theme.name} theme.`,
    )
    return null
  }

  return (
    <Text color={color} large={large}>
      {children}
      {iconName && !!Icon && (
        <Icon fill={color} height={iconSize} width={iconSize} />
      )}
    </Text>
  )
}
