'use client'

import styles from './index.module.css'
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

export default function Cards({ games, loading, showDifficulty }: Props) {
  if (loading) {
    return (
      <div className={styles.container}>
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
      </div>
    )
  }

  if (!games) {
    return null
  }

  return (
    <div className={styles.container}>
      {games.slice(0, 5).map((game, index) => (
        <DesktopCard
          key={index}
          date={game.date}
          difficulty={game.difficulty}
          position={index + 1}
          showDifficulty={showDifficulty}
          teamMembers={game.teamMembers}
          times={game.times}
        />
      ))}
      {games.slice(0, 5).map((game, index) => (
        <MobileCard
          key={index}
          date={game.date}
          difficulty={game.difficulty}
          position={index + 1}
          showDifficulty={showDifficulty}
          teamMembers={game.teamMembers}
          time={game.times.total}
        />
      ))}
    </div>
  )
}
