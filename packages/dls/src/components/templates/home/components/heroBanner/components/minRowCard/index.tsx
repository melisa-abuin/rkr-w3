import styles from './index.module.css'

type PositionColor = 'teal' | 'green' | 'yellow'

const positionColorMap: Record<1 | 2 | 3, PositionColor> = {
  1: 'teal',
  2: 'green',
  3: 'yellow',
}

export default function MinRowCard({ position }: { position: 1 | 2 | 3 }) {
  const color = positionColorMap[position]

  return (
    <div aria-hidden="true" className={styles.container}>
      <div className={`${styles.positionContainer} ${styles[color]}`}>
        {position}
        <div className={styles.divider} />
        <div className={styles.square} />
      </div>
      <div className={styles.column}>
        <div className={styles.title} />
        <div className={styles.subtitle} />
      </div>
      <div className={styles.column}>
        <div className={styles.title} />
        <div className={styles.subtitle} />
      </div>
    </div>
  )
}
