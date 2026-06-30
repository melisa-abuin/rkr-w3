'use client'

import PlayerFinderWithResult from '@/components/organisms/playerFinderWithResult'
import { discordJoinLink } from '@/constants'
import { DiscordData } from '@/interfaces/discord'
import Image from 'next/image'
import FeaturedContent from './components/featuredContent'
import styles from './index.module.css'

interface Props {
  discordData: DiscordData
}

export default function Home({ discordData }: Props) {
  const { data, error } = discordData
  return (
    <div className={styles.bannerContainer}>
      <section aria-labelledby="home-title" className={styles.container}>
        <h1 className={styles.title} id="home-title">
          Run Kitty Run
        </h1>
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
        <FeaturedContent />
      </section>
    </div>
  )
}
