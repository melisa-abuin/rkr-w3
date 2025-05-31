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
  showDifficulty: boolean
}

export default function BestGames({ games, loading, showDifficulty }: Props) {
  const bestGame = games[0]

  if (loading) {
    return (
      <Container>
        <DesktopCardContainer>
          <LoaderHighlightCard showDifficulty={showDifficulty} />
        </DesktopCardContainer>
        <MobileCardContainer>
          <LoaderCard position={1} showDifficulty={showDifficulty} />
        </MobileCardContainer>
        <Wrapper>
          {[...Array(4)].map((_, rowIndex) => (
            <LoaderCard
              key={rowIndex}
              position={rowIndex + 2}
              showDifficulty={showDifficulty}
            />
          ))}
        </Wrapper>
      </Container>
    )
  }

  if (!bestGame) {
    return null
  }

  return (
    <Container>
      <DesktopCardContainer>
        <HighlightCard
          difficulty={bestGame.difficulty}
          time={bestGame.time}
          teamMembers={bestGame.teamMembers}
          date={bestGame.date}
          showDifficulty={showDifficulty}
        />
      </DesktopCardContainer>
      <MobileCardContainer>
        <Card
          date={bestGame.date}
          difficulty={bestGame.difficulty}
          time={bestGame.time}
          teamMembers={bestGame.teamMembers}
          showDifficulty={showDifficulty}
          position={1}
        />
      </MobileCardContainer>
      <Wrapper>
        {games.slice(1, 5).map((game, index) => (
          <Card
            key={index}
            position={index + 2}
            date={game.date}
            difficulty={game.difficulty}
            showDifficulty={showDifficulty}
            time={game.time}
            teamMembers={game.teamMembers}
          />
        ))}
      </Wrapper>
    </Container>
  )
}
