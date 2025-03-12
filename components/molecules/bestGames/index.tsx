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
import LoaderCard from './components/loaderCard'
import LoaderHighlightCard from './components/loaderHighlightCard'

interface Props {
  games: GamesStats
  loading: boolean
}

export default function BestGames({ games, loading }: Props) {
  const bestGame = games[0]
  return (
    <Container>
      <DesktopCardContainer>
        {loading ? (
          <LoaderHighlightCard />
        ) : (
          <HighlightCard
            difficulty={bestGame.difficulty}
            time={bestGame.time}
            teamMembers={bestGame.teamMembers}
          />
        )}
      </DesktopCardContainer>

      <MobileCardContainer>
        {loading ? (
          <LoaderCard position={1} />
        ) : (
          <Card
            difficulty={bestGame.difficulty}
            time={bestGame.time}
            teamMembers={bestGame.teamMembers}
            position={1}
          />
        )}
      </MobileCardContainer>
      <Wrapper>
        {loading
          ? [...Array(4)].map((_, rowIndex) => (
              <LoaderCard key={rowIndex} position={rowIndex + 2} />
            ))
          : games
              .slice(1, 5)
              .map((game, index) => (
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
