import Image from '@/components/atoms/image'
import styles from './index.module.css'

interface Props {
  imageSrc: string
  imageFallbackSrc: string
  label: string
  subLabel?: string
}

export default function VerticalCard({
  imageSrc,
  imageFallbackSrc,
  label,
  subLabel,
}: Props) {
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
