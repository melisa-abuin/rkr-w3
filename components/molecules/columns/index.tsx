'use client'

import type { ReactNode } from 'react'
import styles from './index.module.css'
import LoaderColumns from './components/loader'
import TextWithIcon from '@/components/atoms/textWithIcon'

interface ColumnsProps {
  actionColumn?: ReactNode
  data: Array<{
    title?: string
    columns: Array<{
      description: string
      additionalInfo?: string
      value?: number | string
      highlight?: boolean
    }>
  }>
  loading?: boolean
  title?: string
  variant?: 'primary' | 'secondary'
}

export default function Columns({
  actionColumn,
  data,
  loading = false,
  title,
  variant = 'primary',
}: ColumnsProps) {
  const containerClassName = `${styles.container} ${styles[variant]}`

  return loading ? (
    <LoaderColumns variant={variant} />
  ) : (
    <div className={containerClassName}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      {data.map(({ title, columns }, index) => (
        <div key={index} className={styles.row}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <div className={styles.row}>
            {columns.map(
              ({ description, value, highlight, additionalInfo }) => (
                <div key={description} className={styles.col}>
                  <TextWithIcon
                    large
                    colorName={highlight ? 'yellow' : undefined}
                  >
                    {value || 0}
                  </TextWithIcon>
                  <span
                    className={`${styles.description} ${
                      highlight ? styles.descriptionHighlight : ''
                    }`}
                  >
                    {description}
                  </span>
                  {additionalInfo && (
                    <span
                      className={`${styles.small} ${
                        highlight ? styles.smallHighlight : ''
                      }`}
                    >
                      {additionalInfo}
                    </span>
                  )}
                </div>
              ),
            )}
            {actionColumn && <div className={styles.col}>{actionColumn}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
