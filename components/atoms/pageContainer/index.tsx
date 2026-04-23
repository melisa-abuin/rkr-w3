'use client'

import React, { ReactNode } from 'react'
import styles from './index.module.css'

interface Props {
  align?: 'center' | 'left'
  ariaLabelledby?: string
  as?: 'section' | 'div'
  children: ReactNode
  marginBottom?: number
  marginTop?: number
  title?: string
  withPadding?: boolean
}

export const PageContainer = ({
  align = 'left',
  ariaLabelledby,
  as = 'section',
  children,
  marginBottom = 0,
  marginTop = 0,
  withPadding = true,
  title,
}: Props) => {
  const OuterElement = as
  const titleAlignClass =
    align === 'center' ? styles.titleCenter : styles.titleLeft

  return (
    <OuterElement
      aria-labelledby={ariaLabelledby}
      className={styles.outerContainer}
      style={{
        marginBottom: `${marginBottom}px`,
        marginTop: `${marginTop}px`,
        padding: withPadding ? '0 24px' : '0',
      }}
    >
      <div className={styles.innerContainer}>
        {title && (
          <h2
            className={`${styles.title} ${titleAlignClass}`}
            id={ariaLabelledby}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </OuterElement>
  )
}
