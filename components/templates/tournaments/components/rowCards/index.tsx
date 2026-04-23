'use client'

import PositionCard from '@/components/molecules/positionCard'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from './components/column'
import styles from './index.module.css'
import PlayerTag from '@/components/molecules/playerTag'

interface Props {
  item: Tournament
}

export default function RowCards({ item }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>{item.tournament.region} region</h3>
        <div className={styles.container}>
          {item.players.slice(0, 3).map((player, playerIndex) => (
            <div key={player.battleTag.tag} className={styles.podium}>
              <PositionCard
                isSmallPosition
                aria-label={`Player card for ${player.battleTag.tag}`}
                position={playerIndex + 1}
                variant="highlight"
              >
                <PlayerTag battleTag={player.battleTag} />
                <div className={styles.columnsContainer}>
                  <Column
                    description="Total Time"
                    value={formatSecondsAsTime(player.totalTime)}
                  />
                  {playerIndex === 0 &&
                    player.games.map((game, gameIndex) => (
                      <Column
                        key={gameIndex}
                        description={`Game ${gameIndex + 1}`}
                        value={formatSecondsAsTime(game.totalTime)}
                      />
                    ))}
                </div>
              </PositionCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
