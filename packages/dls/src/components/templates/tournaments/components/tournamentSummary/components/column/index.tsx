import styles from './index.module.css'

interface ColumnProps {
  value: number | string
  description: string
}

export default function Column({ value, description }: ColumnProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{value || 0}</p>
      <span className={styles.description}>{description}</span>
    </div>
  )
}
