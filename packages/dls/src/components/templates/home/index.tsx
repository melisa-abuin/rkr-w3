'use client'

import { DiscordData } from '@/interfaces/discord'
import { LeagueScoreboardEntry } from '@/interfaces/league'
import FeaturedContent from './components/featuredContent'
import HallOfFame from './components/hallOfFame'
import HeroBanner from './components/heroBanner'
import styles from './index.module.css'

interface HomeProps {
  discordData: DiscordData
  hallOfFamePlayers?: LeagueScoreboardEntry[]
}

export default function Home({
  discordData,
  hallOfFamePlayers = [],
}: HomeProps) {
  return (
    <div className={styles.bannerContainer}>
      <HeroBanner discordData={discordData} />
      <HallOfFame players={hallOfFamePlayers} />
      <FeaturedContent />
    </div>
  )
}
