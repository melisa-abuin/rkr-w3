'use client'

import RowCard from '@/components/molecules/rowCard'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from './components/column'
import styles from './index.module.css'
import PlayerTag from '@/components/molecules/playerTag'

interface Props {
  item: Tournament
}

export default function TournamentSummary({ item }: Props) {
  console.log(item)
  return (
    <div className={styles.container}>
      {item.players.map((player, playerIndex) => {
        const battleTag =
          typeof player.battleTag === 'string'
            ? { name: player.battleTag, tag: player.battleTag }
            : player.battleTag

        return (
          <div key={battleTag.tag} className={styles.card}>
            <RowCard
              isSmallPosition
              ariaLabel={`Player card for ${battleTag.tag}`}
              position={playerIndex + 1}
            >
              <PlayerTag battleTag={battleTag} />
              <div className={styles.columnsContainer}>
                <Column
                  description="Total Time"
                  value={formatSecondsAsTime(player.totalTime)}
                />
                {player.games.map((game, gameIndex) => (
                  <Column
                    key={gameIndex}
                    description={`Game ${gameIndex + 1}`}
                    value={formatSecondsAsTime(game.totalTime)}
                  />
                ))}
              </div>
            </RowCard>
          </div>
        )
      })}
    </div>
  )
}
