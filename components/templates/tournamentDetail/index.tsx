'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { Tournament as TournamentInterface } from '@/interfaces/tournament'
import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import RowCards from './components/rowCards'
import Columns from '@/components/molecules/columns'

interface Props {
  data: TournamentInterface
}

export default function Tournaments({ data }: Props) {
  return (
    <>
      <PageHeader
        description=""
        title={`${formatDateToLocale(data.tournament.datetime, true)} 
                      ${data.tournament.gamemode} Tournament`}
      />
      <PageContainer marginBottom={16}>
        <Columns
          data={[
            {
              columns: [
                { description: 'Region', value: data.tournament.region },
                { description: 'Game type', value: data.tournament.gameType },
                { description: 'Game mode', value: data.tournament.gamemode },
                {
                  description: 'Date',
                  value: formatDateToLocale(data.tournament.datetime, true),
                },
              ],
            },
          ]}
        />
      </PageContainer>
      <PageContainer title="Fastest rounds" marginBottom={16}>
        <Columns
          data={[
            {
              columns: [
                {
                  description: 'Round 1',
                  value: formatSecondsAsTime(data.fastestRounds.roundOne.time),
                  additionalInfo: `by ${data.fastestRounds.roundOne.player.name}`,
                },
                {
                  description: 'Round 2',
                  value: formatSecondsAsTime(data.fastestRounds.roundTwo.time),
                  additionalInfo: `by ${data.fastestRounds.roundTwo.player.name}`,
                },
                {
                  description: 'Round 3',
                  value: formatSecondsAsTime(
                    data.fastestRounds.roundThree.time,
                  ),
                  additionalInfo: `by ${data.fastestRounds.roundThree.player.name}`,
                },
                {
                  description: 'Round 4',
                  value: formatSecondsAsTime(data.fastestRounds.roundFour.time),
                  additionalInfo: `by ${data.fastestRounds.roundFour.player.name}`,
                },
                {
                  description: 'Round 5',
                  value: formatSecondsAsTime(data.fastestRounds.roundFive.time),
                  additionalInfo: `by ${data.fastestRounds.roundFive.player.name}`,
                },
              ],
            },
          ]}
        />
      </PageContainer>
      <PageContainer marginBottom={16}>
        <RowCards item={data} />
      </PageContainer>
    </>
  )
}
