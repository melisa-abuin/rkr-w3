'use client'

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
  colorName?: 'primary' | 'secondary' | 'tertiary'
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

type Props = ButtonAsAnchorProps | ButtonAsButtonProps

export default function Button({
  as = 'button',
  children,
  colorName = 'primary',
  disabled = false,
  small = false,
  variant = 'solid',
  ...props
}: Props) {
  const colorVariants: Record<NonNullable<CommonProps['colorName']>, string> = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
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

  if (as === 'a') {
    const anchorProps = props as Omit<ButtonAsAnchorProps, keyof CommonProps>

    return (
      <a className={className} {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = props as Omit<ButtonAsButtonProps, keyof CommonProps>

  return (
    <button className={className} disabled={disabled} {...buttonProps}>
      {children}
    </button>
  )
}
