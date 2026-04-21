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
  const className = `${styles.button} ${styles[colorName]} ${styles[variant]} ${
    small ? styles.small : styles.regular
  }`

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
