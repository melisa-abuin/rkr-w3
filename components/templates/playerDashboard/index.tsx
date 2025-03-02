import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/pageHeader'
import { DetailedPlayerStats } from '@/interfaces/player'
import { formatKeyToWord } from '@/utils/formatKeyToWord'

export default function PlayerDashboard({
  playerData,
}: {
  playerData: DetailedPlayerStats
}) {
  const { awards, battleTag, skins } = playerData

  return (
    <PageContainer>
      <PageHeader
        align="flex-start"
        description={formatKeyToWord(skins?.selectedSkin)}
        title={battleTag!.name}
      />
    </PageContainer>
  )
}
