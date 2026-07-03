'use client'

import FeatureCard from '@/components/organisms/featureCard'
import { useApiQuery } from '@/hooks/useApiQuery'
import { FeaturedContent as FeaturedContentData } from '@/interfaces/featured'
import styles from './index.module.css'

export default function FeaturedContent() {
  const { data: featured, isLoading } = useApiQuery<FeaturedContentData>(
    '/api/featured',
    undefined,
    { staleTime: 7 * 24 * 60 * 60 * 1000 },
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <FeatureCard
          items={featured?.players ?? []}
          linkHref="/stats"
          linkLabel="View all players"
          loading={isLoading}
          title="Featured players"
        />
        <FeatureCard
          items={featured?.challenges ?? []}
          linkHref="/challenges"
          linkLabel="View all challenges"
          loading={isLoading}
          title="Featured challenges"
        />
      </div>
    </div>
  )
}
