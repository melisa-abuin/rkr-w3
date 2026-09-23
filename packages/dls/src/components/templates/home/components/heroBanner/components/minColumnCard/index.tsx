import styles from './index.module.css'

interface MinColumnCardProps {
  secondCard?: boolean
}

export default function MinColumnCard({ secondCard }: MinColumnCardProps) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.container} ${secondCard ? styles.secondCard : ''}`}
    >
      <div className={styles.titleContainer}>
        <div className={styles.title} />
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.row} />
        <div className={styles.row} />
        <div className={styles.row} />
      </div>
    </div>
  )
}
