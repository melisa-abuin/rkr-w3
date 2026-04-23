import styles from './index.module.css'

interface Props {
  pos: number
  isSmall?: boolean
}

export default function PositionNumber({ pos, isSmall = false }: Props) {
  const colorByNumber: Record<number, string> = {
    1: styles.colorTeal,
    2: styles.colorGreen,
    3: styles.colorYellow,
    4: styles.colorPrimary,
    5: styles.colorPrimary,
  }

  const colorClass = colorByNumber[pos] ?? colorByNumber[5]

  return (
    <div
      className={`${styles.number} ${colorClass} ${
        isSmall ? styles.small : styles.regular
      }`}
    >
      {pos}
    </div>
  )
}
