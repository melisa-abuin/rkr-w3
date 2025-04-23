import { PlayersStats } from '@/interfaces/player'
import { Card, Container, ColumnsContainer, RowContainer } from './styled'
import PositionNumber from '@/components/atoms/positionNumber'
import BattleTag from './components/battleTag'
import Column from './components/column'
import LoadingCards from './components/loadingCards'

interface Props {
  data?: PlayersStats
  loading: boolean
}

export default function RowCards({ data = [], loading }: Props) {
  if (loading) {
    return <LoadingCards />
  }

  return (
    <Container>
      {data.map((item, index) => (
        <Card key={index}>
          <RowContainer>
            <PositionNumber pos={index + 1} />
            <BattleTag data={item.battleTag} />
          </RowContainer>
          <ColumnsContainer>
            <Column
              description="Single game"
              value={item.kibbles?.collectedSingleGame ?? 0}
            />
            <Column
              description="All time"
              value={item.kibbles?.collectedAllTime ?? 0}
            />
            <Column
              description="Jackpots"
              value={item.kibbles?.jackpots ?? 0}
            />
            <Column
              description="Super Jackpots"
              value={item.kibbles?.superJackpots ?? 0}
            />
          </ColumnsContainer>
        </Card>
      ))}
    </Container>
  )
}
