import styles from './index.module.css'
import React from 'react'

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
