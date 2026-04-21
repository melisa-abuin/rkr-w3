'use client'

import Image from 'next/image'
import styles from './index.module.css'
import { discordJoinLink } from '@/constants'
import { DiscordData } from '@/interfaces/discord'
import PlayerFinderWithResult from '@/components/organisms/playerFinderWithResult'

interface Props {
  discordData: DiscordData
}

export default function Home({ discordData }: Props) {
  const { data, error } = discordData
  return (
    <section className={styles.bannerContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Run Kitty Run</h1>
        <p className={styles.info}>
          <span className={styles.subtitle}>
            The famous Warcraft 3 custom map
          </span>
          Stats, leaderboards and more
        </p>
        <div className={styles.playerFinderWrapper}>
          <PlayerFinderWithResult />
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
            {data && (
              <>
                <span className={styles.colored}>
                  {data?.approximateMemberCount}
                </span>
                {` kitties - `}
                <span className={styles.colored}>
                  {data?.approximatePresenceCount}
                </span>{' '}
                running
              </>
            )}
            {error && <>There was an issue while fetching discord data</>}
          </small>
        )}
      </div>
    </section>
  )
}
