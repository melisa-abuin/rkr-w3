import { formatSecondsAsTime } from '@/utils'
import { BattleTag, BestTime } from '@/interfaces/player'
import Link from '@/components/atoms/link'
import styles from './index.module.css'

interface Props {
  player?: BattleTag
  hoverable: boolean
  data?: number | BestTime
  isSelected?: boolean
}

const isBestTime = (data: number | BestTime): data is BestTime => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'time' in data &&
    'difficulty' in data
  )
}

export default function Row({ player, data, hoverable, isSelected }: Props) {
  const isEmptyRow = !player || data === undefined || data === null
  const isHoverableRow = hoverable && !isEmptyRow && isBestTime(data)
  const rowClassName = [
    styles.row,
    isHoverableRow ? styles.rowHoverable : '',
    isSelected ? styles.rowSelected : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (isEmptyRow) {
    return (
      <tr className={styles.row}>
        <td className={styles.td}>--</td>
        <td className={styles.td}>--</td>
      </tr>
    )
  }
  const encodedTag = encodeURIComponent(player.tag)
  const playerLink = `/player/${encodedTag}`

  return (
    <tr className={rowClassName}>
      <td className={`${styles.td} ${styles.baseTd}`}>
        <Link href={playerLink}>{player.name}</Link>
      </td>
      {isBestTime(data) ? (
        <>
          <td className={`${styles.td} ${styles.baseTd}`}>
            {formatSecondsAsTime(data.time)}
          </td>
          {hoverable && (
            <td className={`${styles.td} ${styles.hoverTd}`}>
              <Link href={playerLink}>{data.difficulty}</Link>
            </td>
          )}
        </>
      ) : (
        <td className={styles.td}>{data}</td>
      )}
    </tr>
  )
}
