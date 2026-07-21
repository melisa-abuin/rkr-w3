import styles from './index.module.css'

interface ColumnProps {
  value: number
  description: string
  hideOnMobile?: boolean
}

export default function Column({
  value,
  description,
  hideOnMobile = false,
}: ColumnProps) {
  const className = `${styles.container} ${
    hideOnMobile ? styles.containerHiddenOnMobile : ''
  }`

  return (
    <div className={className}>
      <p className={styles.title}>{value || 0}</p>
      <span className={styles.description}>{description}</span>
    </div>
  )
}
