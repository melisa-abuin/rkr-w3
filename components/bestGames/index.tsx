'use client'

import {
  Container,
  DesktopCardContainer,
  MobileCardContainer,
  Wrapper,
} from './styled'
import Card from './components/card'
import HighlightCard from './components/highlightCard'
import { GamesStats } from '@/interfaces/game'

interface Props {
  games: GamesStats
}

export default function BestGames({ games }: Props) {
  const bestGame = games[0]
  return (
    <Container>
      <DesktopCardContainer>
        <HighlightCard
          difficulty={bestGame.difficulty}
          time={bestGame.time}
          teamMembers={bestGame.teamMembers}
        />
      </DesktopCardContainer>
      <MobileCardContainer>
        <Card
          difficulty={bestGame.difficulty}
          time={bestGame.time}
          teamMembers={bestGame.teamMembers}
          position={1}
        />
      </MobileCardContainer>
      <Wrapper>
        {games.slice(1, 5).map((game, index) => (
          <Card
            key={index}
            position={index + 2}
            difficulty={game.difficulty}
            time={game.time}
            teamMembers={game.teamMembers}
          />
        ))}
      </Wrapper>
    </Container>
  )
}
