import RowCard from '@/components/molecules/rowCard'
import rowCardStyles from '@/components/molecules/rowCard/index.module.css'
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
    <div className={rowCardStyles.container}>
      {data.map((item, index) => (
        <RowCard
          key={item.battleTag.tag}
          ariaLabel={`Player card for ${item.battleTag.tag}`}
          position={index + 1}
        >
          <PlayerTag battleTag={item.battleTag} skins={item.skins} />
          <div className={rowCardStyles.columnsContainer}>
            {kibbleLeaderboardColumns.map(({ title, key }) => (
              <Column
                key={key}
                description={title}
                hideOnMobile={key !== 'singleGame'}
                value={item.kibbles?.[key as keyof Kibbles] ?? 0}
              />
            ))}
          </div>
        </RowCard>
      ))}
    </div>
  )
}
