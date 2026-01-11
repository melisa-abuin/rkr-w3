'use client'

import { Container, DesktopCardContainer, MobileCardContainer } from './styled'
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
  if (loading) {
    return (
      <Container>
        {[...Array(4)].map((_, rowIndex) => (
          <DesktopCardContainer key={rowIndex}>
            <LoaderHighlightCard
              position={rowIndex + 1}
              showDifficulty={showDifficulty}
            />
          </DesktopCardContainer>
        ))}
        {[...Array(4)].map((_, rowIndex) => (
          <MobileCardContainer key={rowIndex}>
            <LoaderCard
              position={rowIndex + 1}
              showDifficulty={showDifficulty}
            />
          </MobileCardContainer>
        ))}
      </Container>
    )
  }

  if (!games) {
    return null
  }

  return (
    <Container>
      {games.slice(0, 5).map((game, index) => (
        <DesktopCardContainer key={index}>
          <HighlightCard
            position={index + 1}
            difficulty={game.difficulty}
            times={game.times}
            teamMembers={game.teamMembers}
            date={game.date}
            showDifficulty={showDifficulty}
          />
        </DesktopCardContainer>
      ))}
      {games.slice(0, 5).map((game, index) => (
        <MobileCardContainer key={index}>
          <Card
            date={game.date}
            difficulty={game.difficulty}
            time={game.times.total}
            teamMembers={game.teamMembers}
            showDifficulty={showDifficulty}
            position={index + 1}
          />
        </MobileCardContainer>
      ))}
    </Container>
  )
}
