import React from 'react'
import styles from './index.module.css'

interface Props {
  value: number | string
  description: string
}

export default function Column({ value, description }: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{value || 0}</p>
      <span className={styles.description}>{description}</span>
    </div>
  )
}
