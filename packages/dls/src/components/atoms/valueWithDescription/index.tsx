import styles from './index.module.css'

interface ValueWithDescriptionProps {
  value: number | string
  description: string
  hideOnMobile?: boolean
}

export default function ValueWithDescription({
  value,
  description,
  hideOnMobile = false,
}: ValueWithDescriptionProps) {
  const className = hideOnMobile
    ? `${styles.container} ${styles.containerHiddenOnMobile}`
    : styles.container

  return (
    <div className={className}>
      <p className={styles.title}>{value || 0}</p>
      <span className={styles.description}>{description}</span>
    </div>
  )
}
