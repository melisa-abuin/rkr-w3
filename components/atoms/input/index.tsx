'use client'

import type { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'
import styles from './index.module.css'
import { Cross } from '@/components/icons/cross'

type Props = {
  id: string
  leftIcon?: ReactNode
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onCrossClick?: () => void
  onFocus?: FocusEventHandler<HTMLInputElement>
  placeholder: string
  value: string
}

export default function Input({
  id,
  leftIcon,
  name,
  onChange,
  onCrossClick,
  onFocus,
  placeholder,
  value,
}: Props) {
  return (
    <div className={styles.wrapper}>
      {leftIcon}
      <input
        autoComplete="off"
        className={styles.input}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {value.length > 0 && onCrossClick && (
        <button
          aria-label="Clear input"
          className={styles.clearIconContainer}
          type="button"
          onClick={onCrossClick}
        >
          <Cross fill="currentColor" height={16} width={16} />
        </button>
      )}
    </div>
  )
}
