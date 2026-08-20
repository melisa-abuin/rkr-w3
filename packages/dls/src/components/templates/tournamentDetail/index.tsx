'use client'

import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Columns from '@/components/molecules/columns'
import TournamentSummaryCard from '@/components/organisms/tournamentSummaryCard'
import { TournamentFormatted as TournamentInterface } from '@/interfaces/tournament'
import { formatDateToLocale, formatSecondsAsTime } from '@/utils'
import styles from './index.module.css'

interface TournamentsProps {
  data: TournamentInterface
}

export default function Tournaments({ data }: TournamentsProps) {
  const { tournament, fastestRounds } = data
  const { gamemode } = tournament

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
        {gamemode === 'Solo' && (
          <div className={styles.container}>
            {(data.teams[0]?.members ?? []).map((player, index) => (
              <TournamentSummaryCard
                key={player.battleTag.tag}
                ariaLabel={`Player card for ${player.battleTag.tag}`}
                battleTag={player.battleTag}
                gamemode="Solo"
                games={player.games}
                position={index + 1}
                totalTime={player.totalTime}
              />
            ))}
          </div>
        )}
        {gamemode === 'Team' && (
          <div className={styles.container}>
            {data.teams.map((team, index) => (
              <TournamentSummaryCard
                key={team.color}
                ariaLabel={`Player card for ${team.color} team`}
                color={team.color}
                gamemode="Team"
                games={team.games}
                members={team.members}
                position={index + 1}
                totalTime={team.totalTime}
              />
            ))}
          </div>
        )}
      </PageContainer>
      <PageContainer marginBottom={16} title="Fastest rounds">
        <Columns
          data={[
            {
              columns: [
                {
                  description: 'Round 1',
                  value: formatSecondsAsTime(fastestRounds?.roundOne.time),
                  additionalInfo: `by ${fastestRounds?.roundOne.player.name}`,
                },
                {
                  description: 'Round 2',
                  value: formatSecondsAsTime(fastestRounds?.roundTwo.time),
                  additionalInfo: `by ${fastestRounds?.roundTwo.player.name}`,
                },
                {
                  description: 'Round 3',
                  value: formatSecondsAsTime(fastestRounds?.roundThree.time),
                  additionalInfo: `by ${fastestRounds?.roundThree.player.name}`,
                },
                {
                  description: 'Round 4',
                  value: formatSecondsAsTime(fastestRounds?.roundFour.time),
                  additionalInfo: `by ${fastestRounds?.roundFour.player.name}`,
                },
                {
                  description: 'Round 5',
                  value: formatSecondsAsTime(fastestRounds?.roundFive.time),
                  additionalInfo: `by ${fastestRounds?.roundFive.player.name}`,
                },
              ],
            },
          ]}
        />
      </PageContainer>
    </>
  )
}
