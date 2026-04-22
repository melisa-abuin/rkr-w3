'use client'

import { FastestBesties } from '@/interfaces/player'
import styles from './index.module.css'
import Button from '@/components/atoms/button'

interface BestiesProps {
  besties: FastestBesties
  battleTag: string
}

export default function Besties({ battleTag, besties }: BestiesProps) {
  const sortedBesties = besties[3].concat(besties[2])

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Players with whom <span className={styles.colored}>{battleTag}</span>{' '}
        has played the fastest games
      </p>
      <div className={styles.wrapper}>
        {sortedBesties.map((player) => (
          <Button
            key={player}
            small
            as="a"
            colorName="tertiary"
            href={`/player/${encodeURIComponent(player)}`}
          >
            {player.split('#')[0]}
          </Button>
        ))}
      </div>
    </div>
  )
}
