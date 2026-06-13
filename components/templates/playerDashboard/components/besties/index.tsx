'use client'

import { BattleTag, FastestBestiesData } from '@/interfaces/player'
import styles from './index.module.css'
import Button from '@/components/atoms/button'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import Loader from '@/components/atoms/loader'
import { apiUrl, bestiesGroups } from '@/constants'

interface BestiesProps {
  battleTag: BattleTag
}

export default function Besties({ battleTag }: BestiesProps) {
  const { data, isFetching, error } = useApiQuery<FastestBestiesData>(
    `${apiUrl}/api/PlayerStats/fastestbesties/${encodeURIComponent(battleTag.tag)}`,
  )

  useQueryErrorToast(
    error,
    `Couldn't fetch the fastest besties of ${battleTag.name}, please try again later.`,
  )

  const hasData = data && bestiesGroups.some(({ key }) => data[key].length > 0)

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Players with whom{' '}
        <span className={styles.colored}>{battleTag.name}</span> has played the
        fastest games
      </p>
      {isFetching && <Loader height={28} width={200} />}
      {hasData && (
        <div className={styles.wrapper}>
          {bestiesGroups.flatMap(({ key, colorName }) =>
            data[key].map((player) => (
              <Button
                key={player}
                small
                as="a"
                colorName={colorName}
                href={`/player/${encodeURIComponent(player)}`}
              >
                {player.split('#')[0]}
              </Button>
            )),
          )}
        </div>
      )}
    </div>
  )
}
