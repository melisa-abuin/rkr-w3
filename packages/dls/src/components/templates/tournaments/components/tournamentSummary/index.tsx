'use client'

import CardsContainer from '@/components/atoms/cardsContainer'
import PlayerTag from '@/components/molecules/playerTag'
import RowCard from '@/components/molecules/rowCard'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from './components/column'
import styles from './index.module.css'

interface TournamentSummaryProps {
  item: Tournament
}

export default function TournamentSummary({ item }: TournamentSummaryProps) {
  return (
    <CardsContainer title={`${item.tournament.region} region`}>
      {item.players.slice(0, 3).map((player, playerIndex) => {
        const battleTag =
          typeof player.battleTag === 'string'
            ? { name: player.battleTag, tag: player.battleTag }
            : player.battleTag

        return (
          <div key={battleTag.tag} className={styles.podium}>
            <RowCard
              isSmallPosition
              aria-label={`Player card for ${battleTag.tag}`}
              position={playerIndex + 1}
              variant="highlight"
            >
              <PlayerTag battleTag={battleTag} />
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
            </RowCard>
          </div>
        )
      })}
    </CardsContainer>
  )
}
