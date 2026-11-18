import Image from '@/components/atoms/image'
import type { ReactNode } from 'react'
import LoaderCard from './components/loaderCard'
import styles from './index.module.css'

interface VerticalCardDisplayProps {
  showLabelOnMobile?: boolean
  transparent?: boolean
  withDivider?: boolean
}

type VerticalCardProps =
  | ({ loading: true } & VerticalCardDisplayProps)
  | ({
      loading?: false
      imageSrc: string
      imageFallbackSrc: string
      label: string
      children?: ReactNode
      circularImage?: boolean
    } & VerticalCardDisplayProps)

export default function VerticalCard(props: VerticalCardProps) {
  if (props.loading) {
    return (
      <LoaderCard
        showLabelOnMobile={props.showLabelOnMobile}
        transparent={props.transparent}
        withDivider={props.withDivider}
      />
    )
  }

  const {
    imageSrc,
    imageFallbackSrc,
    label,
    children,
    circularImage = true,
    showLabelOnMobile = false,
    transparent = false,
    withDivider = true,
  } = props

  const className = [
    styles.card,
    showLabelOnMobile && styles.showLabelOnMobile,
    transparent && styles.transparent,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
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
      {withDivider && <hr className={styles.divider} />}
      <p className={styles.label}>{label}</p>
      {children}
    </div>
  )
}
