import { ReactNode } from 'react'
import styles from './index.module.css'

type TextAlign = 'left' | 'center' | 'right'

const alignClass: Record<TextAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
}

interface NameTagProps {
  children: ReactNode
  subtitle: string
  textAlign?: TextAlign
}

export default function NameTag({
  children,
  subtitle,
  textAlign = 'left',
}: NameTagProps) {
  return (
    <div className={`${styles.container} ${alignClass[textAlign]}`}>
      {children}
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  )
}
