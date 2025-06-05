'use client'

import { Player } from '@/interfaces/player'
import { Badges, ColorBadge, Container, SkinBadge, Title } from './styled'
import { colors } from '@/constants'
import { formatKeyToWord, hexToRgba } from '@/utils'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

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

  console.log('Header data', data)
  const topRoundsCount = data ? countTopRounds(data) : 0
  return (
    <Container>
      <Title>{title}</Title>
      <Badges>
        {skin && <SkinBadge>{formatKeyToWord(skin)}</SkinBadge>}
        {color && (
          <ColorBadge color={hexToRgba(colors[color], 0.5)}>
            {`${color} kitty`}
          </ColorBadge>
        )}
        {!!data &&
          Object.entries(data).map(
            ([key, value]) =>
              value.all === 0 && <SkinBadge key={key}>{value.label}</SkinBadge>,
          )}

        {topRoundsCount > 0 && (
          <SkinBadge>Fastest Kitty x{topRoundsCount}</SkinBadge>
        )}
      </Badges>
    </Container>
  )
}
