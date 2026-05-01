import { Children, ReactNode } from 'react'
import styles from './index.module.css'

interface CardsContainerProps {
  children: ReactNode
  title: string
  twoPerRow?: boolean
}

export default function CardsContainer({
  children,
  title,
  twoPerRow = false,
}: CardsContainerProps) {
  const containerClassName = `${styles.container} ${
    twoPerRow ? styles.twoPerRow : ''
  }`

  const content = twoPerRow
    ? Children.map(children, (child, index) => (
        <div key={index} className={styles.twoPerRowItem}>
          {child}
        </div>
      ))
    : children

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <div className={containerClassName}>{content}</div>
      </div>
    </div>
  )
}
