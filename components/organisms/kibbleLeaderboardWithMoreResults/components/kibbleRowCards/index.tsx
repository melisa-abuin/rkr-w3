import PositionCard from '@/components/molecules/positionCard'
import {
  ColumnsContainer,
  Container as CardsContainer,
} from '@/components/molecules/positionCard/styled'
import { kibbleLeaderboardColumns } from '@/constants'
import { Kibbles, Player } from '@/interfaces/player'
import Column from './components/column'
import LoadingCards from './components/loadingCards'
import PlayerTag from '@/components/molecules/playerTag'

interface Props {
  data?: Player[]
  loading: boolean
}

export default function KibbleRowCards({ data = [], loading }: Props) {
  if (loading) {
    return <LoadingCards columns={kibbleLeaderboardColumns.length} />
  }

  return (
    <CardsContainer>
      {data.map((item, index) => (
        <PositionCard
          key={item.battleTag.tag}
          ariaLabel={`Player card for ${item.battleTag.tag}`}
          position={index + 1}
        >
          <PlayerTag battleTag={item.battleTag} skins={item.skins} />
          <ColumnsContainer>
            {kibbleLeaderboardColumns.map(({ title, key }) => (
              <Column
                key={key}
                description={title}
                hideOnMobile={key !== 'singleGame'}
                value={item.kibbles?.[key as keyof Kibbles] ?? 0}
              />
            ))}
          </ColumnsContainer>
        </PositionCard>
      ))}
    </CardsContainer>
  )
}
