'use client'

import { FastestBesties } from '@/interfaces/player'
import { Description, Colored, Container, Wrapper } from './styled'
import Button from '@/components/atoms/button'

interface BestiesProps {
  besties: FastestBesties
  battleTag: string
}

export default function Besties({ battleTag, besties }: BestiesProps) {
  const sortedBesties = besties[3].concat(besties[2])

  return (
    <Container>
      <Description>
        Players with whom <Colored>{battleTag}</Colored> has played the fastest
        games
      </Description>
      <Wrapper>
        {sortedBesties.map((player) => (
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
