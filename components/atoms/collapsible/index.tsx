import { ReactNode, useState } from 'react'
import styles from './index.module.css'
import { Plus } from '@/components/icons/plus'
import { Minus } from '@/components/icons/minus'

interface CollapsibleProps {
  children?: ReactNode
  title: string
}

export default function Collapsible({ children, title }: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const iconProps = {
    fill: 'var(--text-color-primary)',
    height: 16,
    width: 16,
  }

  const bodyClass = isCollapsed ? styles.bodyCollapsed : styles.bodyOpen

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <h2 className={styles.title}>{title}</h2>
        {isCollapsed ? <Plus {...iconProps} /> : <Minus {...iconProps} />}
      </div>
      <div aria-hidden={isCollapsed} className={`${styles.body} ${bodyClass}`}>
        {children}
      </div>
    </div>
  )
}
