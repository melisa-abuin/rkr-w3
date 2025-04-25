import { Card, Container, ColumnsContainer, RowContainer } from './styled'
import PositionNumber from '@/components/atoms/positionNumber'
import BattleTag from './components/battleTag'
import Column from './components/column'
import LoadingCards from './components/loadingCards'
import Image from '@/components/atoms/image'
import { DetailedPlayerStats, Skins } from '@/interfaces/player'
import { kibbleLeaderboardColumns } from '@/constants'

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
            {kibbleLeaderboardColumns.map(({ title, key }) => (
              <Column
                key={key}
                description={title}
                value={item.kibbles?.[key] ?? 0}
              />
            ))}
          </ColumnsContainer>
        </Card>
      ))}
    </Container>
  )
}
