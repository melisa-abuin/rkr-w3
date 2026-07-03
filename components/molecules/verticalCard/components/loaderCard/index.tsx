import Loader from '@/components/atoms/loader'
import cardStyles from '../../index.module.css'
import styles from './index.module.css'

export default function LoaderCard() {
  return (
    <div className={cardStyles.card}>
      <Loader height={52} width={52} />
      <div className={styles.hideOnMobile}>
        <hr className={cardStyles.divider} />
        <Loader height={14} width={80} />
        <Loader height={12} width={60} />
      </div>
    </div>
  )
}
