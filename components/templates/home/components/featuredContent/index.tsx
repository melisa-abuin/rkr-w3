'use client'

import FeatureCard, {
  FeatureCardItem,
} from '@/components/organisms/featureCard'
import { useApiQuery } from '@/hooks/useApiQuery'
import { FeaturedContent as FeaturedContentData } from '@/interfaces/featured'
import { formatSecondsAsTime } from '@/utils'
import styles from './index.module.css'

const formatChallengeImageSrc = (key: string) =>
  `/awards/${key[0].toLowerCase()}${key.slice(1)}.png`

const formatPlayerImageSrc = (selectedSkin: string | undefined) =>
  selectedSkin
    ? `/awards/${selectedSkin[0].toLowerCase()}${selectedSkin.slice(1)}.png`
    : '/potm.png'

export default function FeaturedContent() {
  const { data: featured } = useApiQuery<FeaturedContentData>('/api/featured')

  const playerItems: FeatureCardItem[] = (featured?.players ?? []).map((p) => ({
    imageSrc: formatPlayerImageSrc(p.selectedSkin),
    imageFallbackSrc: '/potm.png',
    label: p.battleTag.name,
    subLabel: formatSecondsAsTime(p.roundFive?.best?.time),
  }))

  const challengeItems: FeatureCardItem[] = (featured?.challenges ?? []).map(
    (c) => ({
      imageSrc: formatChallengeImageSrc(c.key),
      imageFallbackSrc: '/awards/fallback.png',
      label: c.displayName,
      subLabel: `${c.percentage}%`,
    }),
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <FeatureCard
          items={playerItems}
          linkHref="/leaderboard"
          linkLabel="View leaderboard"
          title="Featured players"
        />
        <FeatureCard
          items={challengeItems}
          linkHref="/tournaments"
          linkLabel="View all challenges"
          title="Featured challenges"
        />
      </div>
    </div>
  )
}
