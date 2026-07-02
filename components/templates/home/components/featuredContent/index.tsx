'use client'

import FeatureCard from '@/components/organisms/featureCard'
import { useApiQuery } from '@/hooks/useApiQuery'
import { FeaturedContent as FeaturedContentData } from '@/interfaces/featured'
import styles from './index.module.css'

export default function FeaturedContent() {
  const { data: featured } = useApiQuery<FeaturedContentData>('/api/featured')

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <FeatureCard
          items={featured?.players ?? []}
          linkHref="/leaderboard"
          linkLabel="View leaderboard"
          title="Featured players"
        />
        <FeatureCard
          items={featured?.challenges ?? []}
          linkHref="/tournaments"
          linkLabel="View all challenges"
          title="Featured challenges"
        />
      </div>
    </div>
  )
}
