import PodiumCard from '@/components/molecules/podiumCard'
import { LeagueScoreboardEntry } from '@/interfaces/league'
import styles from './index.module.css'

interface Props {
  podium: LeagueScoreboardEntry[]
}

export default function Podium({ podium }: Props) {
  const [first, second, third] = podium

  return (
    <div className={styles.podium}>
      {second && (
        <div className={`${styles.slot} ${styles.second}`}>
          <PodiumCard entry={second} position={2} />
        </div>
      )}
      {first && (
        <div className={`${styles.slot} ${styles.first}`}>
          <PodiumCard entry={first} position={1} />
        </div>
      )}
      {third && (
        <div className={`${styles.slot} ${styles.third}`}>
          <PodiumCard entry={third} position={3} />
        </div>
      )}
    </div>
  )
}
