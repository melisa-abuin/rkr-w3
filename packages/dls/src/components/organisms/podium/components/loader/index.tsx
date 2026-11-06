import Loader from '@/components/atoms/loader'
import styles from '../../index.module.css'

interface LoaderPodiumProps {
  compact: boolean
  withBase: boolean
}

export default function LoaderPodium({ compact, withBase }: LoaderPodiumProps) {
  return (
    <>
      <div className={`${styles.podium} ${compact ? styles.compact : ''}`}>
        <div className={`${styles.slot} ${styles.second}`}>
          <Loader height="100%" width="100%" />
        </div>
        <div className={`${styles.slot} ${styles.first}`}>
          <Loader height="100%" width="100%" />
        </div>
        <div className={`${styles.slot} ${styles.third}`}>
          <Loader height="100%" width="100%" />
        </div>
      </div>
      {withBase && (
        <div className={styles.base}>
          <div className={`${styles.baseSquare} ${styles.topBaseSquare}`} />
          <div className={`${styles.baseSquare} ${styles.bottomBaseSquare}`} />
        </div>
      )}
    </>
  )
}
