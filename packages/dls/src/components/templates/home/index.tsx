'use client'

import { DiscordData } from '@/interfaces/discord'
import FeaturedContent from './components/featuredContent'
import HeroBanner from './components/heroBanner'
import styles from './index.module.css'

interface HomeProps {
  discordData: DiscordData
}

export default function Home({ discordData }: HomeProps) {
  return (
    <div className={styles.bannerContainer}>
      <HeroBanner discordData={discordData} />
      <FeaturedContent />
    </div>
  )
}
