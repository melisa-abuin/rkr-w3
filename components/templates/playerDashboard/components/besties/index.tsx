'use client'

import { FastestBesties } from '@/interfaces/player'
import { Description, Container, Wrapper } from './styled'
import Button from '@/components/atoms/button'

export default function Besties({ besties }: { besties: FastestBesties }) {
  return (
    <Container>
      <Description>
        Players with whom you have played your fastest games
      </Description>
      <Wrapper>
        {besties[3].map((player) => (
          <Button
            as="a"
            key={player}
            href={`/player/${encodeURIComponent(player)}`}
            colorName="primary"
            small
          >
            {player.split('#')[0]}
          </Button>
        ))}
        {besties[2].map((player) => (
          <Button
            as="a"
            key={player}
            href={`/player/${encodeURIComponent(player)}`}
            colorName="tertiary"
            small
          >
            {player.split('#')[0]}
          </Button>
        ))}
      </Wrapper>
    </Container>
  )
}
