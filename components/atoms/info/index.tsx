'use client'

import { ReactNode } from 'react'
import styles from './index.module.css'

interface InfoProps {
  children: ReactNode
  as?: 'p' | 'ul'
}

export default function Info({ children, as = 'p' }: InfoProps) {
  const Element = as

  return (
    <div className={styles.container}>
      <Element className={styles.text}>{children}</Element>
    </div>
  )
}
