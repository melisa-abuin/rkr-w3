import styles from './index.module.css'

export interface BarItem {
  label: string
  percentage: number
  value: number
}

interface BarsProps {
  items: BarItem[]
}

export default function Bars({ items }: BarsProps) {
  return (
    <div className={styles.container}>
      {items.map(({ label, percentage, value }) => (
        <div key={label} className={styles.row}>
          <span className={styles.label}>{label}</span>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${percentage}%` }} />
          </div>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  )
}
