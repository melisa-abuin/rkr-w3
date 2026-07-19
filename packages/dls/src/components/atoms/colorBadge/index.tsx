'use client'

import { BadgeColor } from '@/interfaces/theme'
import { ReactNode } from 'react'
import styles from './index.module.css'

interface ColorBadgeProps {
  children: ReactNode
  colorName?: BadgeColor | null
  small?: boolean
}

const colorVariants: Record<BadgeColor, string> = {
  primary: styles.colorPrimary,
  tertiary: styles.colorTertiary,
  red: styles.colorRed,
  blue: styles.colorBlue,
  teal: styles.colorTeal,
  purple: styles.colorPurple,
  yellow: styles.colorYellow,
  orange: styles.colorOrange,
  green: styles.colorGreen,
  pink: styles.colorPink,
  gray: styles.colorGray,
  lightblue: styles.colorLightblue,
  darkgreen: styles.colorDarkgreen,
  brown: styles.colorBrown,
  maroon: styles.colorMaroon,
  navy: styles.colorNavy,
  turquoise: styles.colorTurquoise,
  violet: styles.colorViolet,
  wheat: styles.colorWheat,
  peach: styles.colorPeach,
  mint: styles.colorMint,
  lavender: styles.colorLavender,
  coal: styles.colorCoal,
  snow: styles.colorSnow,
  emerald: styles.colorEmerald,
  peanut: styles.colorPeanut,
}

export default function ColorBadge({
  children,
  colorName = 'red',
  small,
}: ColorBadgeProps) {
  if (!colorName) {
    return null
  }

  const colorClass = colorVariants[colorName]

  return (
    <span
      className={`${styles.badge} ${colorClass || styles.colorRed} ${
        small ? styles.small : ''
      }`}
    >
      {children}
    </span>
  )
}
