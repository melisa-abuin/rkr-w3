import Image from '@/components/atoms/image'
import LoaderCard from './components/loaderCard'
import styles from './index.module.css'

type VerticalCardProps =
  | { loading: true }
  | {
      loading?: false
      imageSrc: string
      imageFallbackSrc: string
      label: string
      subLabel?: string
    }

export default function VerticalCard(props: VerticalCardProps) {
  if (props.loading) return <LoaderCard />

  const { imageSrc, imageFallbackSrc, label, subLabel } = props
  return (
    <div className={styles.card}>
      <Image
        circular
        colored
        alt={label}
        fallbackSrc={imageFallbackSrc}
        height={52}
        src={imageSrc}
        width={52}
      />
      <hr className={styles.divider} />
      <p className={styles.label}>{label}</p>
      {subLabel && <p className={styles.subLabel}>{subLabel}</p>}
    </div>
  )
}
