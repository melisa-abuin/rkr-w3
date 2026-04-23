import type { ReactNode } from 'react'
import styles from './index.module.css'
import { Crown } from '@/components/icons/crown'
import { Winner } from '@/components/icons/winner'
import { Flame } from '@/components/icons/flame'
import { Clock } from '@/components/icons/clock'
import { Paw } from '@/components/icons/paw'
import { Information } from '@/components/icons/information'

type ColorName =
  | 'black'
  | 'brandPrimary'
  | 'brandSecondary'
  | 'green'
  | 'highlight'
  | 'primary'
  | 'secondary'
  | 'teal'
  | 'tertiary'
  | 'white'
  | 'yellow'

interface Props {
  children: ReactNode
  colorName?: ColorName
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
  const Icon = iconName && icons[iconName]
  const className = `${styles.text} ${styles[colorName]} ${
    large ? styles.large : styles.small
  }`

  return (
    <span className={className}>
      {children}
      {iconName && !!Icon && (
        <Icon fill="currentColor" height={iconSize} width={iconSize} />
      )}
    </span>
  )
}
