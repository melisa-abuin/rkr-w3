'use client'

import { Container } from './styled'
import MobileCard from './components/mobileCard'
import DesktopCard from './components/desktopCard'
import { GamesStats } from '@/interfaces/game'
import LoaderMobileCard from './components/loaderMobileCard'
import LoaderDesktopCard from './components/loaderDesktopCard'

interface Props {
  games: GamesStats
  loading: boolean
  showDifficulty: boolean
}

export default function BestGames({ games, loading, showDifficulty }: Props) {
  if (loading) {
    return (
      <Container>
        {[...Array(5)].map((_, rowIndex) => (
          <LoaderDesktopCard
            key={rowIndex}
            position={rowIndex + 1}
            showDifficulty={showDifficulty}
          />
        ))}
        {[...Array(5)].map((_, rowIndex) => (
          <LoaderMobileCard
            key={rowIndex}
            position={rowIndex + 1}
            showDifficulty={showDifficulty}
          />
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
        <DesktopCard
          key={index}
          position={index + 1}
          difficulty={game.difficulty}
          times={game.times}
          teamMembers={game.teamMembers}
          date={game.date}
          showDifficulty={showDifficulty}
        />
      ))}
      {games.slice(0, 5).map((game, index) => (
        <MobileCard
          key={index}
          date={game.date}
          difficulty={game.difficulty}
          time={game.times.total}
          teamMembers={game.teamMembers}
          showDifficulty={showDifficulty}
          position={index + 1}
        />
      ))}
    </Container>
  )
}
