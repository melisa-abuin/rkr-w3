'use client'

import { Player, Tops } from '@/interfaces/player'
import { Badges, Container, FloatingTitle, Title } from './styled'
import { formatKeyToWord } from '@/utils'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useElementInView } from '@/hooks/useElementInView'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import Tooltip from '@/components/atoms/tooltip'
import Loader from '@/components/atoms/loader'
import ColorBadge from '@/components/atoms/colorBadge'

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
  nightmare?: number
}) => {
  let count = 0
  if (entry.normal === 0) count++
  if (entry.hard === 0) count++
  if (entry.impossible === 0) count++
  if (entry.nightmare === 0) count++
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
  const { isElementInView, elementRef } = useElementInView(90)
  const showFloatingTitle = !isElementInView

  const { data, isFetching, error } = useApiQuery<Tops>(
    `/api/playerTopPositions/${encodeURIComponent(battleTag)}`,
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
      <Container>
        {showFloatingTitle && (
          <FloatingTitle aria-hidden>{title}</FloatingTitle>
        )}
        <Title ref={elementRef}>{title}</Title>
        <Badges>
          <Loader height={28} width={120} />
          <Loader height={28} width={120} />
        </Badges>
      </Container>
    )
  }

  return (
    <Container>
      {showFloatingTitle && <FloatingTitle aria-hidden>{title}</FloatingTitle>}
      <Title ref={elementRef}>{title}</Title>
      <Badges>
        {skin && (
          <ColorBadge colorName="primary">{formatKeyToWord(skin)}</ColorBadge>
        )}

        <ColorBadge colorName={color}>{`${color} kitty`}</ColorBadge>
        {!!data &&
          Object.entries(data).map(
            ([key, value]) =>
              value.all === 0 && (
                <Tooltip key={key} body={value.description}>
                  <ColorBadge colorName="tertiary">{value.label}</ColorBadge>
                </Tooltip>
              ),
          )}

        {topRoundsCount > 0 && (
          <Tooltip
            body={`This player has ${topRoundsCount} of the fastest times for a round.`}
          >
            <ColorBadge colorName="tertiary">
              Fastest Kitty x{topRoundsCount}
            </ColorBadge>
          </Tooltip>
        )}
        {fastestGamesCount > 0 && (
          <Tooltip
            body={`This player has participated in ${fastestGamesCount} of the fastest games.`}
          >
            <ColorBadge colorName="tertiary">
              Fastest Team Kitty x{fastestGamesCount}
            </ColorBadge>
          </Tooltip>
        )}
      </Badges>
    </Container>
  )
}
