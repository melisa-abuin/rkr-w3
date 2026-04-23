import type { CSSProperties } from 'react'
import styles from './index.module.css'

interface Props {
  height?: number | string
  variant?: 'primary' | 'secondary'
  width?: number | string
}

export default function Loader({
  height = 'auto',
  variant = 'primary',
  width = 'auto',
}: Props) {
  const className = `${styles.background} ${styles[variant]}`
  const style = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
  } satisfies CSSProperties

  return (
    <div
      aria-busy="true"
      aria-valuetext="Loading..."
      className={className}
      role="progressbar"
      style={style}
    />
  )
}
