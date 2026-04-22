import styles from './index.module.css'

interface Props {
  value: number
  description: string
  hideOnMobile?: boolean
}

export default function Column({
  value,
  description,
  hideOnMobile = false,
}: Props) {
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
