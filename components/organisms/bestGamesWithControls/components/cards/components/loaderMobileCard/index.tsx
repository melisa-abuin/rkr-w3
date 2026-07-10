import Loader from '@/components/atoms/loader'
import PositionNumber from '@/components/atoms/positionNumber'
import styles from '../mobileCard/index.module.css'

interface LoaderMobileCardProps {
  position: number
  showDifficulty: boolean
}

export default function LoaderMobileCard({
  position,
  showDifficulty,
}: LoaderMobileCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <PositionNumber isSmall pos={position} />
        <div className={styles.wrapper}>
          <h4 className={styles.title}>
            <Loader height={21} variant="secondary" width={70} />
          </h4>
          {showDifficulty && (
            <span className={styles.description}>
              <Loader height={17} variant="secondary" width={70} />
            </span>
          )}
        </div>
      </div>
      <div className={styles.nameList}>
        <Loader height={30} width={'90%'} />
      </div>
    </div>
  )
}
