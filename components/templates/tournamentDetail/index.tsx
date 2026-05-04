'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { Tournament as TournamentInterface } from '@/interfaces/tournament'
import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import TournamentSummary from './components/tournamentSummary'
import Columns from '@/components/molecules/columns'

interface Props {
  data: TournamentInterface
}

export default function Tournaments({ data }: Props) {
  const { tournament, fastestRounds } = data
  return (
    <>
      <PageHeader
        description=""
        title={`${formatDateToLocale(tournament.datetime, true)} 
                      ${tournament.gamemode} Tournament`}
      />
      <PageContainer marginBottom={16}>
        <Columns
          data={[
            {
              columns: [
                { description: 'Region', value: tournament.region },
                { description: 'Game type', value: tournament.gameType },
                { description: 'Game mode', value: tournament.gamemode },
                {
                  description: 'Date',
                  value: formatDateToLocale(tournament.datetime, true),
                },
              ],
            },
          ]}
        />
      </PageContainer>
      <PageContainer marginBottom={16}>
        <TournamentSummary item={data} />
      </PageContainer>
      <PageContainer marginBottom={16} title="Fastest rounds">
        <Columns
          data={[
            {
              columns: [
                {
                  description: 'Round 1',
                  value: formatSecondsAsTime(fastestRounds.roundOne.time),
                  additionalInfo: `by ${fastestRounds.roundOne.player.name}`,
                },
                {
                  description: 'Round 2',
                  value: formatSecondsAsTime(fastestRounds.roundTwo.time),
                  additionalInfo: `by ${fastestRounds.roundTwo.player.name}`,
                },
                {
                  description: 'Round 3',
                  value: formatSecondsAsTime(fastestRounds.roundThree.time),
                  additionalInfo: `by ${fastestRounds.roundThree.player.name}`,
                },
                {
                  description: 'Round 4',
                  value: formatSecondsAsTime(fastestRounds.roundFour.time),
                  additionalInfo: `by ${fastestRounds.roundFour.player.name}`,
                },
                {
                  description: 'Round 5',
                  value: formatSecondsAsTime(fastestRounds.roundFive.time),
                  additionalInfo: `by ${fastestRounds.roundFive.player.name}`,
                },
              ],
            },
          ]}
        />
      </PageContainer>
    </>
  )
}
