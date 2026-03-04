'use client'

import PositionCard from '@/components/molecules/positionCard'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from '../column'
import BattleTag from '../battleTag'
import { Card, ColumnsContainer, Container } from './styled'

interface Props {
  item: Tournament
}

export default function RowCards({ item }: Props) {
  return (
    <Container>
      {item.players.map((player, playerIndex) => (
        <Card key={player.battleTag.tag}>
          <PositionCard
            ariaLabel={`Player card for ${player.battleTag.tag}`}
            isSmallPosition
            position={playerIndex + 1}
          >
            <BattleTag data={player.battleTag} />
            <ColumnsContainer>
              <Column
                value={formatSecondsAsTime(player.totalTime)}
                description="Total Time"
              />
              {player.games.map((game, gameIndex) => (
                <Column
                  key={gameIndex}
                  value={formatSecondsAsTime(game.totalTime)}
                  description={`Game ${gameIndex + 1}`}
                />
              ))}
            </ColumnsContainer>
          </PositionCard>
        </Card>
      ))}
    </Container>
  )
}
