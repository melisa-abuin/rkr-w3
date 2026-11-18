import Loader from '@/components/atoms/loader'
import cardStyles from '../../index.module.css'
import styles from './index.module.css'

interface LoaderCardProps {
  showLabelOnMobile?: boolean
  transparent?: boolean
  withDivider?: boolean
}

export default function LoaderCard({
  showLabelOnMobile = false,
  transparent = false,
  withDivider = true,
}: LoaderCardProps) {
  return (
    <div
      className={`${cardStyles.card} ${transparent ? cardStyles.transparent : ''}`}
    >
      <Loader height={52} width={52} />
      <div className={showLabelOnMobile ? styles.visible : styles.hideOnMobile}>
        {withDivider && <hr className={cardStyles.divider} />}
        <Loader height={14} width={80} />
        <Loader height={12} width={60} />
      </div>
    </div>
  )
}
