'use client'

import React, { ReactNode } from 'react'
import styles from './index.module.css'

interface Props {
  children: ReactNode
  as?: 'p' | 'ul'
}

export default function Info({ children, as = 'p' }: Props) {
  const Element = as

  return (
    <div className={styles.container}>
      <Element className={styles.text}>{children}</Element>
    </div>
  )
}
