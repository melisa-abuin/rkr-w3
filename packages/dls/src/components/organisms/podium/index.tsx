import PodiumCard from '@/components/molecules/podiumCard'
import { LeaguePodiumEntry } from '@/interfaces/league'
import LoaderPodium from './components/loader'
import styles from './index.module.css'

type PodiumProps = {
  compact?: boolean
  withBase?: boolean
} & (
  | { loading: true; podium?: never }
  | { loading?: false; podium: LeaguePodiumEntry[] }
)

export default function Podium(props: PodiumProps) {
  const { compact = false, withBase = false } = props

  if (props.loading)
    return <LoaderPodium compact={compact} withBase={withBase} />

  const [first, second, third] = props.podium

  return (
    <>
      <div className={`${styles.podium} ${compact ? styles.compact : ''}`}>
        {second && (
          <div className={`${styles.slot} ${styles.second}`}>
            <PodiumCard
              compact={compact}
              entry={second}
              position={2}
              squareBottom={withBase}
            />
          </div>
        )}
        {first && (
          <div className={`${styles.slot} ${styles.first}`}>
            <PodiumCard
              compact={compact}
              entry={first}
              position={1}
              squareBottom={withBase}
            />
          </div>
        )}
        {third && (
          <div className={`${styles.slot} ${styles.third}`}>
            <PodiumCard
              compact={compact}
              entry={third}
              position={3}
              squareBottom={withBase}
            />
          </div>
        )}
      </div>
      {withBase && (
        <div className={styles.base} data-testid="podium-base">
          <div className={`${styles.baseSquare} ${styles.topBaseSquare}`} />
          <div className={`${styles.baseSquare} ${styles.bottomBaseSquare}`} />
        </div>
      )}
    </>
  )
}
