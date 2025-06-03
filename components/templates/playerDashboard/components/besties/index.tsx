'use client'

import { FastestBesties } from '@/interfaces/player'
import { Description, Container, Wrapper } from './styled'
import Button from '@/components/atoms/button'

interface BestiesProps {
  besties: FastestBesties
  battleTag: string
}

export default function Besties({ battleTag, besties }: BestiesProps) {
  return (
    <Container>
      <Description>
        Players with whom {battleTag} has played the fastest games
      </Description>
      <Wrapper>
        {besties[3].map((player) => (
          <Button
            as="a"
            key={player}
            href={`/player/${encodeURIComponent(player)}`}
            colorName="secondary"
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
