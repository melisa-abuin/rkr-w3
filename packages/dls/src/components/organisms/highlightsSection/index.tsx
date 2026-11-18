import PageContainer from '@/components/atoms/pageContainer'
import VerticalCard from '@/components/molecules/verticalCard'
import styles from './index.module.css'

export interface HighlightItem {
  imageFallbackSrc: string
  imageSrc: string
  subtitle: string
  title: string
}

interface HighlightsSectionProps {
  items: HighlightItem[]
  loading?: boolean
  subtitle: string
  title: string
  transparentCards?: boolean
  withDivider?: boolean
}

const loadingCards = [0, 1, 2]

export default function HighlightsSection({
  items,
  loading = false,
  subtitle,
  title,
  transparentCards = false,
  withDivider = true,
}: HighlightsSectionProps) {
  return (
    <PageContainer align="center" subtitle={subtitle} title={title}>
      <div className={styles.grid}>
        {loading
          ? loadingCards.map((index) => (
              <VerticalCard
                key={index}
                loading
                showLabelOnMobile
                transparent={transparentCards}
                withDivider={withDivider}
              />
            ))
          : items.map((item) => (
              <VerticalCard
                key={item.title}
                showLabelOnMobile
                imageFallbackSrc={item.imageFallbackSrc}
                imageSrc={item.imageSrc}
                label={item.title}
                transparent={transparentCards}
                withDivider={withDivider}
              >
                <p className={styles.subtitle}>{item.subtitle}</p>
              </VerticalCard>
            ))}
      </div>
    </PageContainer>
  )
}
