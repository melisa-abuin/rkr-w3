import { Card, Container, ColumnsContainer, RowContainer } from './styled'
import PositionNumber from '@/components/atoms/positionNumber'
import BattleTag from './components/battleTag'
import Column from './components/column'
import LoadingCards from './components/loadingCards'
import Image from '@/components/atoms/image'
import { DetailedPlayerStats, Skins } from '@/interfaces/player'

const formatSkinName = (skin: Skins) => {
  if (!skin.selectedSkin) return '/potm.png'
  return `/awards/${skin.selectedSkin[0].toLowerCase()}${skin.selectedSkin.slice(1)}.png `
}

interface Props {
  data?: DetailedPlayerStats[]
  loading: boolean
}

export default function RowCards({ data = [], loading }: Props) {
  if (loading) {
    return <LoadingCards />
  }

  return (
    <Container>
      {data.map((item, index) => (
        <Card
          key={item.battleTag.tag}
          aria-label={`Player card for ${item.battleTag.tag}`}
        >
          <RowContainer>
            <PositionNumber pos={index + 1} />
            <Image
              alt={item.battleTag.tag}
              colored
              fallbackSrc={'/potm.png'}
              src={formatSkinName(item.skins)}
            />

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
