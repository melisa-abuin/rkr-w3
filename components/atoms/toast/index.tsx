'use client'

import { Cross } from '@/components/icons/cross'
import { ToastVariant } from '@/interfaces/toast'
import styles from './index.module.css'

type Props = {
  index: number
  message: string
  onClick: () => void
  variant?: ToastVariant
}

export default function Toast({
  index,
  message,
  onClick,
  variant = 'error',
}: Props) {
  const containerClassName = `${styles.container} ${styles[variant]}`

  return (
    <div className={styles.wrapper} style={{ bottom: `calc(${index} * 74px)` }}>
      <div className={containerClassName} onClick={onClick}>
        <p className={styles.message}>{message}</p>
        <Cross fill="currentColor" height={16} width={16} />
      </div>
    </div>
  )
}
