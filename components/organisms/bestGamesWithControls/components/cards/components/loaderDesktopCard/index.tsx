import RowCard from '@/components/molecules/rowCard'
import styles from '../desktopCard/index.module.css'
import Loader from '@/components/atoms/loader'

interface Props {
  position: number
  showDifficulty: boolean
}

export default function LoaderDesktopCard({ position, showDifficulty }: Props) {
  return (
    <div className={styles.desktopOnly}>
      <RowCard position={position}>
        <div className={styles.detailContainer}>
          <div className={styles.wrapper}>
            <Loader
              height={21}
              variant="secondary"
              width={showDifficulty ? 200 : 100}
            />
          </div>
          <div className={styles.wrapper}>
            <Loader height={20} variant="secondary" width={400} />
          </div>
        </div>
      </RowCard>
    </div>
  )
}
