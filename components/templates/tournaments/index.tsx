'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import { Card, ColumnsContainer, Container, RowContainer } from './styled'
import PositionNumber from '@/components/atoms/positionNumber'
import BattleTag from './components/battleTag'
import Column from './components/column'
import { Tournaments as TournamentsInterface } from '@/interfaces/tournament'

interface Props {
  data: TournamentsInterface[]
}
export default function Tournaments({ data }: Props) {
  return (
    <>
      <PageContainer>
        <PageHeader
          description="tournaments are events organized by the community everyone is welcome to participate"
          title="Tournaments"
        />
      </PageContainer>
      {data.map((group, index) => (
        <PageContainer
          key={index}
          marginBottom={16}
          title={`${formatDateToLocale(group[0].tournament.datetime, true)} 
            ${group[0].tournament.gamemode} Tournament`}
        >
          {group.map((item) => (
            <Container key={item.tournament.id}>
              <div>{item.tournament.region} region</div>
              <Container>
                {item.players.slice(0, 3).map((player, playerIndex) => (
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
                see more...
              </Container>
            </Container>
          ))}
        </PageContainer>
      ))}
    </>
  )
}
