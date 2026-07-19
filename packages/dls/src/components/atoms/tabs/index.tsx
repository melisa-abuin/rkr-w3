'use client'

import React, { useState } from 'react'
import styles from './index.module.css'

interface TabsProps {
  children: React.ReactNode[]
  defaultIndex?: number | null
  titles: string[]
  onTabChange?: (newIndex: number) => void
}

export default function Tabs({
  titles,
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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {titles.map((title, index) => (
          <button
            key={title}
            className={`${styles.button} ${
              index === activeIndex ? styles.buttonActive : ''
            }`}
            onClick={() => handleTabClick(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className={styles.content}>{children[activeIndex]}</div>
    </div>
  )
}
