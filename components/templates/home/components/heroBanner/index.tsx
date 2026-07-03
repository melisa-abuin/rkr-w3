'use client'

import PlayerFinderWithResult from '@/components/organisms/playerFinderWithResult'
import { discordJoinLink } from '@/constants'
import { useTypewriter } from '@/hooks/useTypewriter'
import { DiscordData } from '@/interfaces/discord'
import Image from 'next/image'
import styles from './index.module.css'

interface Props {
  discordData: DiscordData
}

export default function HeroBanner({ discordData }: Props) {
  const { data, error } = discordData
  const placeholder = useTypewriter('Search a player...')

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title} id="home-title">
          Run Kitty Run
        </h1>
        <p className={styles.info}>
          The statistics for the custom map from Warcraft 3
        </p>
        <div className={styles.playerFinderWrapper}>
          <PlayerFinderWithResult placeholder={placeholder} />
        </div>
        <a href={discordJoinLink}>
          <Image
            alt="discord invitation"
            height={53}
            loading="eager"
            priority={true}
            src="/discord.png"
            width={198}
          />
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
