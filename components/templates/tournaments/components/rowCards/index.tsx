'use client'

import PositionCard from '@/components/molecules/positionCard'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from '../column'
import { Card, Podium, Title, ColumnsContainer, Container } from './styled'
import PlayerTag from '@/components/molecules/playerTag'

interface Props {
  item: Tournament
}

export default function RowCards({ item }: Props) {
  return (
    <Container>
      <Card>
        <Title>{item.tournament.region} region</Title>
        <Container>
          {item.players.slice(0, 3).map((player, playerIndex) => (
            <Podium key={player.battleTag.tag}>
              <PositionCard
                isSmallPosition
                aria-label={`Player card for ${player.battleTag.tag}`}
                position={playerIndex + 1}
                variant="highlight"
              >
                <PlayerTag battleTag={player.battleTag} />
                <ColumnsContainer>
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
                </ColumnsContainer>
              </PositionCard>
            </Podium>
          ))}
        </Container>
      </Card>
    </Container>
  )
}
