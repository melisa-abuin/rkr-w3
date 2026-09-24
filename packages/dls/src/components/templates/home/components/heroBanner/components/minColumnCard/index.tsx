import styles from './index.module.css'

interface MinColumnCardProps {
  absolute?: boolean
  secondCard?: boolean
}

export default function MinColumnCard({
  absolute,
  secondCard,
}: MinColumnCardProps) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.container} ${secondCard ? styles.secondCard : ''} ${absolute ? styles.absolute : ''}`}
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
