'use client'

import { useState } from 'react'
import Button from '@/components/atoms/button'
import PositionNumber from '@/components/atoms/positionNumber'
import { Tournament } from '@/interfaces/tournament'
import { formatSecondsAsTime } from '@/utils'
import Column from '../column'
import BattleTag from '../battleTag'
import { Card, ColumnsContainer, Container, RowContainer } from '../../styled'
import { ButtonContainer } from './styled'

interface Props {
  item: Tournament
}

export default function RowCards({ item }: Props) {
  const [showAllPlayers, setShowAllPlayers] = useState(false)
  const players = showAllPlayers ? item.players : item.players.slice(0, 3)

  return (
    <Container>
      <h3>{item.tournament.region} region</h3>
      <Container>
        {players.map((player, playerIndex) => (
          <Card
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
              {player.games.map((game, gameIndex) => (
                <Column
                  key={gameIndex}
                  value={formatSecondsAsTime(game.totalTime)}
                  description={`Game ${gameIndex + 1}`}
                />
              ))}
            </ColumnsContainer>
          </Card>
        ))}
        {!showAllPlayers && item.players.length > 3 && (
          <ButtonContainer>
            <Button
              onClick={() => setShowAllPlayers(true)}
              small
              variant="outline"
              colorName="primary"
            >
              Show all players
            </Button>
          </ButtonContainer>
        )}
      </Container>
    </Container>
  )
}
