'use client'

import type { ChangeEventHandler, FocusEventHandler } from 'react'
import styles from './index.module.css'

type TextareaProps = {
  id: string
  label?: string
  maxLength?: number
  name: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  onFocus?: FocusEventHandler<HTMLTextAreaElement>
  placeholder: string
  rows?: number
  value: string
}

export default function Textarea({
  id,
  label,
  maxLength,
  name,
  onChange,
  onFocus,
  placeholder,
  rows = 4,
  value,
}: TextareaProps) {
  return (
    <div className={label ? styles.container : undefined}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.wrapper}>
        <textarea
          className={styles.textarea}
          id={id}
          maxLength={maxLength}
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
        />
      </div>
    </div>
  )
}
