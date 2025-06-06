'use client'

import { Player } from '@/interfaces/player'
import { Badges, ColorBadge, Container, SkinBadge, Title } from './styled'
import { colors } from '@/constants'
import { formatKeyToWord, hexToRgba } from '@/utils'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import Tooltip from '@/components/atoms/tooltip'
import { useTheme } from '@/hooks/useTheme'

interface Props {
  battleTag: string
  color: Player['mostPlayedColor']
  skin: string
  title: string
}

const countTopRounds = (data) => {
  let count = 0

  for (const key in data) {
    if (key.startsWith('round')) {
      const round = data[key]
      if (round.normal === 0) {
        count++
      }
      if (round.hard === 0) {
        count++
      }
      if (round.impossible === 0) {
        count++
      }
    }
  }

  return count
}

const countTopGames = (data) => {
  let count = 0

  if (data.normal == 0) {
    count++
  }
  if (data.hard === 0) {
    count++
  }
  if (data.impossible === 0) {
    count++
  }

  return count
}

export default function Header({ battleTag, color, skin, title }: Props) {
  const { data, isFetching, error } = useApiQuery(
    `/api/playerTopPositions/${encodeURIComponent(battleTag)}`,
    undefined,
    { enabled: true },
  )

  useQueryErrorToast(
    error,
    `Couldn't fetch the top stats of ${battleTag}, please try again later.`,
  )

  const [theme] = useTheme()

  const topRoundsCount = data ? countTopRounds(data) : 0
  const fastestGamesCount = data ? countTopGames(data.fastestGames) : 0
  console.log('Header data', fastestGamesCount)

  return (
    <Container>
      <Title>{title}</Title>
      <Badges>
        {skin && (
          <ColorBadge color={theme.color.primary}>
            {formatKeyToWord(skin)}
          </ColorBadge>
        )}
        {color && (
          <ColorBadge color={hexToRgba(colors[color], 0.5)}>
            {`${color} kitty`}
          </ColorBadge>
        )}
        {!!data &&
          Object.entries(data).map(
            ([key, value]) =>
              value.all === 0 && (
                <Tooltip body={value.description} key={key}>
                  <ColorBadge color={theme.button.tertiary.background}>
                    {value.label}
                  </ColorBadge>
                </Tooltip>
              ),
          )}

        {topRoundsCount > 0 && (
          <Tooltip
            body={`This player has ${topRoundsCount} of the fastest times for a round.`}
          >
            <ColorBadge color={theme.button.tertiary.background}>
              Fastest Kitty x{topRoundsCount}
            </ColorBadge>
          </Tooltip>
        )}
        {fastestGamesCount > 0 && (
          <Tooltip
            body={`This player has participated in ${fastestGamesCount} of the fastest games.`}
          >
            <ColorBadge color={theme.button.tertiary.background}>
              Fastest Team Kitty x{fastestGamesCount}
            </ColorBadge>
          </Tooltip>
        )}
      </Badges>
    </Container>
  )
}
