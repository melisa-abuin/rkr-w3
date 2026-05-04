'use client'

import RowCard from '@/components/molecules/rowCard'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from './components/column'
import styles from './index.module.css'
import PlayerTag from '@/components/molecules/playerTag'
import CardsContainer from '@/components/atoms/cardsContainer'

interface Props {
  item: Tournament
}

export default function TournamentSummary({ item }: Props) {
  return (
    <CardsContainer title={`${item.tournament.region} region`}>
      {item.players.slice(0, 3).map((player, playerIndex) => (
        <div key={player.battleTag.tag} className={styles.podium}>
          <RowCard
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
          </RowCard>
        </div>
      ))}
    </CardsContainer>
  )
}
