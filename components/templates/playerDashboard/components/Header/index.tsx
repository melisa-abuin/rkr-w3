'use client'

import { Player, Tops } from '@/interfaces/player'
import { Badges, ColorBadge, Container, Title } from './styled'
import { colors } from '@/constants'
import { formatKeyToWord, hexToRgba } from '@/utils'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import Tooltip from '@/components/atoms/tooltip'
import { useTheme } from '@/hooks/useTheme'
import Loader from '@/components/atoms/loader'

interface Props {
  battleTag: string
  color: Player['mostPlayedColor']
  skin: string
  title: string
}

const countZeros = (entry: {
  normal?: number
  hard?: number
  impossible?: number
}) => {
  let count = 0
  if (entry.normal === 0) count++
  if (entry.hard === 0) count++
  if (entry.impossible === 0) count++
  return count
}

const countTopRounds = (data: Tops) => {
  let count = 0
  for (const key in data) {
    if (key.startsWith('round')) {
      count += countZeros(data[key])
    }
  }
  return count
}

export default function Header({ battleTag, color, skin, title }: Props) {
  const { data, isFetching, error } = useApiQuery<Tops>(
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
  const fastestGamesCount = data ? countZeros(data.fastestGames) : 0

  if (isFetching) {
    return (
      <Container>
        <Title>{title}</Title>
        <Badges>
          <Loader height={28} width={120} />
          <Loader height={28} width={120} />
        </Badges>
      </Container>
    )
  }
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
          <ColorBadge capitalize color={hexToRgba(colors[color], 0.5)}>
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
