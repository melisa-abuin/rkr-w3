'use client'

import { DetailedPlayerStats } from '@/interfaces/player'
import { Badges, ColorBadge, Container, SkinBadge, Title } from './styled'
import { colors } from '@/constants'
import { formatKeyToWord, hexToRgba } from '@/utils'

interface Props {
  color: DetailedPlayerStats['mostPlayedColor']
  skin: string
  title: string
}

export default function Header({ color, skin, title }: Props) {
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
      </Badges>
    </Container>
  )
}
