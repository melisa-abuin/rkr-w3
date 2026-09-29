'use client'

import { Discord } from '@/components/icons/discord'
import { discordJoinLink } from '@/constants'
import { DiscordData } from '@/interfaces/discord'
import IconSectionDesktop from './components/iconSectionDesktop'
import IconSectionMobile from './components/iconSectionMobile'
import IconSectionTablet from './components/iconSectionTablet'
import styles from './index.module.css'

interface HeroBannerProps {
  discordData: DiscordData
}

export default function HeroBanner({ discordData }: HeroBannerProps) {
  const { data, error } = discordData

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h1 className={styles.title} id="home-title">
            RKR Stats
          </h1>
          <p className={styles.info}>
            The statistics for the custom map from Warcraft 3 Run Kitty Run
            <br />
            <span className={styles.colored}>
              Seasons, tournaments, leaderboards and more
            </span>
          </p>

          <div className={styles.row}>
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
        <div className={styles.iconSection}>
          <IconSectionDesktop />
          <IconSectionTablet />
          <IconSectionMobile />
        </div>
      </div>
    </div>
  )
}
