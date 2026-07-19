import React, { ReactNode } from 'react'
import styles from './index.module.css'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            aria-label="Close modal"
            className={styles.button}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
