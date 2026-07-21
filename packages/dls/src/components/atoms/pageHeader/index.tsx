'use client'

import styles from './index.module.css'

interface PageHeaderProps {
  align?: 'center' | 'flex-start'
  description: string
  title: string
}

export default function PageHeader({
  align = 'center',
  description,
  title,
}: PageHeaderProps) {
  return (
    <header
      className={`${styles.header} ${align === 'center' ? styles.headerCenter : styles.headerStart}`}
    >
      <h1 className={styles.title}>{title}</h1>
      <p
        className={`${styles.info} ${align === 'center' ? styles.infoCenter : styles.infoStart}`}
      >
        {description}
      </p>
    </header>
  )
}
