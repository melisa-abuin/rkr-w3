import HighlightsSection from '@/components/organisms/highlightsSection'
import { FeaturedItem } from '@/interfaces/featured'
import styles from './index.module.css'

interface ChallengesProps {
  items: FeaturedItem[]
  loading: boolean
}

export default function Challenges({ items, loading }: ChallengesProps) {
  if (!loading && !items.length) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <HighlightsSection
        transparentCards
        items={items}
        loading={loading}
        subtitle="Challenges are in-game awards you earn by completing specific goals. Some are harder to get than others, and only a small percentage of players have unlocked them."
        title="Challenges"
        withDivider={false}
      />
    </div>
  )
}
