import Loader from '@/components/atoms/loader'
import PositionCard from '@/components/molecules/positionCard'
import positionCardStyles from '@/components/molecules/positionCard/index.module.css'
import styles from './index.module.css'

interface Props {
  rows?: number
  columns: number
}

export default function LoadingCards({ rows = 5, columns }: Props) {
  return (
    <div className={positionCardStyles.container}>
      {[...Array(rows)].map((_, rowIndex) => (
        <PositionCard key={rowIndex} position={rowIndex + 1}>
          <div className={styles.col}>
            <Loader height={30} variant="secondary" width={'60%'} />
            <Loader height={20} variant="secondary" width={'60%'} />
          </div>
          <div className={positionCardStyles.columnsContainer}>
            {[...Array(columns)].map((_, colIndex) => (
              <div key={colIndex} className={styles.col}>
                <Loader height={30} variant="secondary" width={'80%'} />
                <Loader height={20} variant="secondary" width={'80%'} />
              </div>
            ))}
          </div>
        </PositionCard>
      ))}
    </div>
  )
}
