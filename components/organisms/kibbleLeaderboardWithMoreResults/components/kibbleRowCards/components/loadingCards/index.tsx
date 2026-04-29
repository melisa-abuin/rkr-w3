import Loader from '@/components/atoms/loader'
import RowCard from '@/components/molecules/rowCard'
import rowCardStyles from '@/components/molecules/rowCard/index.module.css'
import styles from './index.module.css'

interface Props {
  rows?: number
  columns: number
}

export default function LoadingCards({ rows = 5, columns }: Props) {
  return (
    <div className={rowCardStyles.container}>
      {[...Array(rows)].map((_, rowIndex) => (
        <RowCard key={rowIndex} position={rowIndex + 1}>
          <div className={styles.col}>
            <Loader height={30} variant="secondary" width={'60%'} />
            <Loader height={20} variant="secondary" width={'60%'} />
          </div>
          <div className={rowCardStyles.columnsContainer}>
            {[...Array(columns)].map((_, colIndex) => (
              <div key={colIndex} className={styles.col}>
                <Loader height={30} variant="secondary" width={'80%'} />
                <Loader height={20} variant="secondary" width={'80%'} />
              </div>
            ))}
          </div>
        </RowCard>
      ))}
    </div>
  )
}
