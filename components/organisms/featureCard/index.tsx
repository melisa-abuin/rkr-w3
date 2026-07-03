import Link from '@/components/atoms/link'
import VerticalCard from '@/components/molecules/verticalCard'
import styles from './index.module.css'

export interface FeatureCardItem {
  imageSrc: string
  imageFallbackSrc: string
  label: string
  subLabel?: string
}

interface Props {
  title: string
  linkHref: string
  linkLabel: string
  items: FeatureCardItem[]
  loading?: boolean
}

export default function FeatureCard({
  title,
  linkHref,
  linkLabel,
  items,
  loading,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>
        {loading
          ? [...Array(3)].map((_, i) => <VerticalCard key={i} loading />)
          : items.map((item) => <VerticalCard key={item.label} {...item} />)}
      </div>
      <Link href={linkHref}>{linkLabel}</Link>
    </div>
  )
}
