'use client'

import React, { useState } from 'react'
import styles from './index.module.css'

interface TabsProps {
  children: React.ReactNode[]
  defaultIndex?: number | null
  titles: string[]
  vertical?: boolean
  description?: string
  onTabChange?: (newIndex: number) => void
}

export default function Tabs({
  vertical = false,
  titles,
  description,
  children,
  defaultIndex = null,
  onTabChange,
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(
    defaultIndex !== null ? defaultIndex : 0,
  )

  const handleTabClick = (index: number) => {
    onTabChange?.(index)
    setActiveIndex(index)
  }

  return (
    <div className={`${styles.wrapper} ${vertical ? styles.vertical : ''}`}>
      <div className={styles.header}>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.tabList} role="tablist">
          {titles.map((title, index) => (
            <button
              key={title}
              aria-selected={index === activeIndex}
              className={`${styles.button} ${
                index === activeIndex ? styles.buttonActive : ''
              }`}
              role="tab"
              onClick={() => handleTabClick(index)}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.content} role="tabpanel">
        {children[activeIndex]}
      </div>
    </div>
  )
}
