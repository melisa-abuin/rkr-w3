'use client'

import FeatureCard from '@/components/organisms/featureCard'
import { featuredApi } from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { FeaturedApiResponse } from '@/interfaces/featured'
import { formatFeaturedContent } from '@/utils/formatFeaturedContent'
import styles from './index.module.css'

export default function FeaturedContent() {
  const { data, isLoading } = useApiQuery<FeaturedApiResponse>(
    featuredApi,
    undefined,
    { staleTime: 7 * 24 * 60 * 60 * 1000 },
  )

  const featured = data ? formatFeaturedContent(data) : undefined

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
