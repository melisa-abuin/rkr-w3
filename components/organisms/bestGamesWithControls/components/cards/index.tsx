'use client'

import { BestGameTimesFormatted } from '@/interfaces/game'
import DesktopCard from './components/desktopCard'
import LoaderDesktopCard from './components/loaderDesktopCard'
import LoaderMobileCard from './components/loaderMobileCard'
import MobileCard from './components/mobileCard'
import styles from './index.module.css'

interface CardsProps {
  games: BestGameTimesFormatted
  loading: boolean
  showDifficulty: boolean
}

export default function Cards({ games, loading, showDifficulty }: CardsProps) {
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
          {...game}
          position={index + 1}
          showDifficulty={showDifficulty}
        />
      ))}
      {games.slice(0, 5).map((game, index) => (
        <MobileCard
          key={index}
          {...game}
          position={index + 1}
          showDifficulty={showDifficulty}
        />
      ))}
    </div>
  )
}
