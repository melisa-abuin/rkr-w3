import Image from '@/components/atoms/image'
import type { ReactNode } from 'react'
import LoaderCard from './components/loaderCard'
import styles from './index.module.css'

type VerticalCardProps =
  | { loading: true }
  | {
      loading?: false
      imageSrc: string
      imageFallbackSrc: string
      label: string
      children?: ReactNode
      circularImage?: boolean
    }

export default function VerticalCard(props: VerticalCardProps) {
  if (props.loading) return <LoaderCard />

  const {
    imageSrc,
    imageFallbackSrc,
    label,
    children,
    circularImage = true,
  } = props

  return (
    <div className={styles.card}>
      <Image
        colored
        alt={label}
        bordered={circularImage}
        circular={circularImage}
        fallbackSrc={imageFallbackSrc}
        height={52}
        src={imageSrc}
        width={52}
      />
      <hr className={styles.divider} />
      <p className={styles.label}>{label}</p>
      {children}
    </div>
  )
}
