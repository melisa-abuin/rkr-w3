'use client'

import PositionCard from '@/components/molecules/positionCard'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from '../column'
import { Card, ColumnsContainer, Container } from './styled'
import PlayerTag from '@/components/molecules/playerTag'

interface Props {
  item: Tournament
}

export default function RowCards({ item }: Props) {
  return (
    <Container>
      {item.players.map((player, playerIndex) => (
        <Card key={player.battleTag.tag}>
          <PositionCard
            isSmallPosition
            ariaLabel={`Player card for ${player.battleTag.tag}`}
            position={playerIndex + 1}
          >
            <PlayerTag battleTag={player.battleTag} />
            <ColumnsContainer>
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
            </ColumnsContainer>
          </PositionCard>
        </Card>
      ))}
    </Container>
  )
}
