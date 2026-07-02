'use client'

import ColorBadge from '@/components/atoms/colorBadge'
import Loader from '@/components/atoms/loader'
import Tooltip from '@/components/atoms/tooltip'
import ColorBadgeWithTooltip from '@/components/molecules/colorBadgeWithTooltip'
import { playersApi, topStatsConfiguration } from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useElementInView } from '@/hooks/useElementInView'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { Player, Tops } from '@/interfaces/player'
import { countTopRounds, countZeros, formatKeyToWord } from '@/utils'
import styles from './index.module.css'

interface Props {
  battleTag: string
  color: Player['mostPlayedColor']
  skin: string
  title: string
}

export default function Header({ battleTag, color, skin, title }: Props) {
  const { isElementInView, elementRef } = useElementInView(90)
  const showFloatingTitle = !isElementInView

  const { data, isFetching, error } = useApiQuery<Tops>(
    `${playersApi}/${encodeURIComponent(battleTag)}/tops`,
    undefined,
    { enabled: true },
  )

  useQueryErrorToast(
    error,
    `Couldn't fetch the top stats of ${battleTag}, please try again later.`,
  )

  const topRoundsCount = data ? countTopRounds(data) : 0
  const fastestGamesCount = data ? countZeros(data.fastestGames) : 0

  if (isFetching) {
    return (
      <header className={styles.container}>
        {showFloatingTitle && (
          <h2 aria-hidden className={styles.floatingTitle}>
            {title}
          </h2>
        )}
        <h1 ref={elementRef} className={styles.title}>
          {title}
        </h1>
        <div className={styles.badges}>
          <Loader height={28} width={120} />
          <Loader height={28} width={120} />
        </div>
      </header>
    )
  }

  return (
    <header className={styles.container}>
      {showFloatingTitle && (
        <h2 aria-hidden className={styles.floatingTitle}>
          {title}
        </h2>
      )}
      <h1 ref={elementRef} className={styles.title}>
        {title}
      </h1>
      <div className={styles.badges}>
        {skin && (
          <ColorBadge colorName="primary">{formatKeyToWord(skin)}</ColorBadge>
        )}

        <ColorBadge colorName={color}>{`${color} kitty`}</ColorBadge>
        {!!data &&
          topStatsConfiguration.map(
            ({ key, label, description }) =>
              data[key as keyof Tops] === 0 && (
                <Tooltip key={key} body={description}>
                  <ColorBadge colorName="tertiary">{label}</ColorBadge>
                </Tooltip>
              ),
          )}

        {topRoundsCount > 0 && (
          <ColorBadgeWithTooltip
            body={`This player has ${topRoundsCount} of the fastest times for a round.`}
            colorName="tertiary"
          >
            Fastest Kitty x{topRoundsCount}
          </ColorBadgeWithTooltip>
        )}
        {fastestGamesCount > 0 && (
          <ColorBadgeWithTooltip
            body={`This player has participated in ${fastestGamesCount} of the fastest games.`}
            colorName="tertiary"
          >
            Fastest Team Kitty x{fastestGamesCount}
          </ColorBadgeWithTooltip>
        )}
      </div>
    </header>
  )
}
