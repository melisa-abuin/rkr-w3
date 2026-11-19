'use client'

import { featuredApi } from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { DiscordData } from '@/interfaces/discord'
import { FeaturedApiResponse } from '@/interfaces/featured'
import { formatFeaturedChallenges } from '@/utils/formatFeaturedChallenges'
import Challenges from './components/challenges'
import HallOfFame from './components/hallOfFame'
import HeroBanner from './components/heroBanner'
import styles from './index.module.css'

interface HomeProps {
  discordData: DiscordData
}

export default function Home({ discordData }: HomeProps) {
  const { data, isLoading } = useApiQuery<FeaturedApiResponse>(
    featuredApi,
    undefined,
    { staleTime: 7 * 24 * 60 * 60 * 1000 },
  )

  return (
    <div className={styles.bannerContainer}>
      <HeroBanner discordData={discordData} />
      <HallOfFame />
      <Challenges
        items={data ? formatFeaturedChallenges(data) : []}
        loading={isLoading}
      />
    </div>
  )
}
