'use client'

import NextLink from 'next/link'
import { ReactNode } from 'react'
import styles from './index.module.css'

interface LinkProps {
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
}: LinkProps) {
  const colorVariants: Record<string, string> = {
    black: styles.colorBlack,
    brandPrimary: styles.colorBrandPrimary,
    brandSecondary: styles.colorBrandSecondary,
    highlight: styles.colorHighlight,
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    tertiary: styles.colorTertiary,
    white: styles.colorWhite,
  }

  const colorClass = colorVariants[color]

  if (!colorClass) {
    console.error(`Text color "${color}" is not defined for Link component.`)
  }

  return (
    <NextLink
      className={`${styles.link} ${colorClass || styles.colorPrimary}`}
      download={download}
      href={href}
      rel={rel}
      target={target}
      onClick={onClick}
    >
      {children}
    </NextLink>
  )
}
