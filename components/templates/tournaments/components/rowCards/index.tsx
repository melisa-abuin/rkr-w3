'use client'

import PositionNumber from '@/components/atoms/positionNumber'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from '../column'
import BattleTag from '../battleTag'
import {
  Card,
  Podium,
  Title,
  ColumnsContainer,
  Container,
  RowContainer,
} from './styled'

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
            <Podium
              key={player.battleTag.tag}
              aria-label={`Player card for ${player.battleTag.tag}`}
            >
              <RowContainer>
                <PositionNumber pos={playerIndex + 1} isSmall />
                <BattleTag data={player.battleTag} />
              </RowContainer>
              <ColumnsContainer>
                <Column
                  value={formatSecondsAsTime(player.totalTime)}
                  description="Total Time"
                />
                {playerIndex === 0 &&
                  player.games.map((game, gameIndex) => (
                    <Column
                      key={gameIndex}
                      value={formatSecondsAsTime(game.totalTime)}
                      description={`Game ${gameIndex + 1}`}
                    />
                  ))}
              </ColumnsContainer>
            </Podium>
          ))}
        </Container>
      </Card>
    </Container>
  )
}
