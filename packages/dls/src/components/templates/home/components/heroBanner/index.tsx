'use client'

import { Discord } from '@/components/icons/discord'
import PlayerFinderWithResult from '@/components/organisms/playerFinderWithResult'
import { discordJoinLink } from '@/constants'
import { useTypewriter } from '@/hooks/useTypewriter'
import { DiscordData } from '@/interfaces/discord'
import styles from './index.module.css'

interface HeroBannerProps {
  discordData: DiscordData
}

export default function HeroBanner({ discordData }: HeroBannerProps) {
  const { data, error } = discordData
  const placeholder = useTypewriter('Search a player...')

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title} id="home-title">
          RKR Statistics
        </h1>
        <p className={styles.info}>
          The statistics for the custom map from Warcraft 3 Run Kitty Run
        </p>
        <div className={styles.playerFinderWrapper}>
          <PlayerFinderWithResult placeholder={placeholder} />
        </div>
        <a className={styles.discordLink} href={discordJoinLink}>
          Join our
          <Discord />
        </a>
        {data && !error && (
          <small className={styles.discordDetail}>
            <span className={styles.colored}>
              {data?.approximateMemberCount}
            </span>
            {` kitties - `}
            <span className={styles.colored}>
              {data?.approximatePresenceCount}
            </span>{' '}
            running
          </small>
        )}
      </div>
    </div>
  )
}
