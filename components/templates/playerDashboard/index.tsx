import { PageContainer } from '@/components/atoms/pageContainer'
import Awards from '@/components/awards'
import Columns from '@/components/columns'
import PageHeader from '@/components/pageHeader'
import { roundNames } from '@/constants'
import { DetailedPlayerStats } from '@/interfaces/player'
import { formatKeyToWord } from '@/utils/formatKeyToWord'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'

export default function PlayerDashboard({
  playerData,
}: {
  playerData: DetailedPlayerStats
}) {
  const { awards, battleTag, skins } = playerData

  const difficultyNames = ['normal', 'hard', 'impossible'] as const

  return (
    <>
      <PageContainer>
        <PageHeader
          align="flex-start"
          description={formatKeyToWord(skins?.selectedSkin)}
          title={battleTag!.name}
        />
      </PageContainer>
      <PageContainer title="Overall Stats">
        <Columns
          columns={[
            {
              title: 'Saves',
              value: playerData?.saves,
            },
            {
              title: 'Deaths',
              value: playerData?.deaths,
            },
            {
              title: 'S/D Ratio',
              value: playerData?.saveDeathRatio,
            },
            {
              title: 'Highest Save Streak',
              value: playerData?.saveStreak?.highestSaveStreak,
            },
            {
              title: 'Highest Win Streak',
              value: playerData?.highestWinStreak,
            },
          ]}
        />
      </PageContainer>
      <PageContainer title="Game Awards" marginTop={24} marginBottom={24}>
        <Awards awards={awards!} />
      </PageContainer>
      {difficultyNames.map((difficulty) => (
        <PageContainer
          key={difficulty}
          title={`Best ${difficulty} Times`}
          marginBottom={24}
        >
          <Columns
            columns={roundNames.map((round) => ({
              title: `Round ${round}`,
              value: secondsToSexagesimal(
                playerData?.[`round${round}`][difficulty] || 0,
              ),
            }))}
          />
        </PageContainer>
      ))}
    </>
  )
}
