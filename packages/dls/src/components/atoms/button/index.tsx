'use client'

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode'
import Image from 'next/image'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import styles from './index.module.css'

type CommonProps = {
  children: ReactNode
  disabled?: boolean
  small?: boolean
  loading?: boolean
  colorName?: 'primary' | 'secondary' | 'tertiary' | 'discord'
  variant?: 'outline' | 'solid' | 'ghost'
}

type ButtonAsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'> & {
    as?: 'button'
  }

type ButtonAsAnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'color'> & {
    as: 'a'
  }

type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps

export default function Button({
  as = 'button',
  children,
  colorName = 'primary',
  disabled = false,
  loading = false,
  small = false,
  variant = 'solid',
  ...props
}: ButtonProps) {
  const colorVariants: Record<NonNullable<CommonProps['colorName']>, string> = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
    discord: styles.discord,
  }

  const buttonVariants: Record<NonNullable<CommonProps['variant']>, string> = {
    ghost: styles.ghost,
    outline: styles.outline,
    solid: styles.solid,
  }

  const sizeClass = small ? styles.small : styles.regular
  const colorClass = colorVariants[colorName]
  const variantClass = buttonVariants[variant]
  const className = `${styles.button} ${colorClass || styles.primary} ${
    variantClass || styles.solid
  } ${sizeClass}`

  const prefersDarkMode = usePrefersDarkMode()

  const content = loading ? (
    <Image
      alt="loading"
      height={16}
      src={prefersDarkMode ? '/loading-dark.gif' : '/loading-light.gif'}
      width={16}
    />
  ) : (
    children
  )

  if (as === 'a') {
    const anchorProps = props as Omit<ButtonAsAnchorProps, keyof CommonProps>

    return (
      <a className={className} {...anchorProps}>
        {content}
      </a>
    )
  }

  const buttonProps = props as Omit<ButtonAsButtonProps, keyof CommonProps>

  return (
    <button className={className} disabled={disabled} {...buttonProps}>
      {content}
    </button>
  )
}
