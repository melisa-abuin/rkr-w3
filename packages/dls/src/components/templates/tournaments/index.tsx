'use client'

import Button from '@/components/atoms/button'
import CardsContainer from '@/components/atoms/cardsContainer'
import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import TournamentSummaryCard from '@/components/organisms/tournamentSummaryCard'
import { TournamentApi } from '@/interfaces/tournament'
import { formatDateToLocale, groupTournamentsByGroupId } from '@/utils'
import { Fragment } from 'react/jsx-runtime'
import styles from './index.module.css'

interface TournamentsProps {
  data: TournamentApi
}

export default function Tournaments({ data }: TournamentsProps) {
  const groups = groupTournamentsByGroupId(data.tournaments)
  return (
    <>
      <PageContainer>
        <PageHeader
          description="Community-organized competitive events, open to everyone. Join a tournament and test your skills!"
          title="Tournaments"
        />
      </PageContainer>
      {groups.map((group, index) => (
        <PageContainer
          key={index}
          marginBottom={16}
          title={`${formatDateToLocale(group[0].tournament.datetime, true)} 
            ${group[0].tournament.gamemode} Tournament`}
        >
          {group.map((item) => {
            const { gamemode, region } = item.tournament
            return (
              <Fragment key={item.tournament.id}>
                <CardsContainer title={`${region} region`}>
                  {gamemode === 'Solo' &&
                    (item.teams[0]?.members ?? [])
                      .slice(0, 3)
                      .map((player, i) => (
                        <TournamentSummaryCard
                          key={player.battleTag.tag}
                          ariaLabel={`Player card for ${player.battleTag.tag}`}
                          battleTag={player.battleTag}
                          gamemode="Solo"
                          games={player.games}
                          position={i + 1}
                          totalTime={player.totalTime}
                          variant="highlight"
                        />
                      ))}
                  {gamemode === 'Team' &&
                    item.teams
                      .slice(0, 3)
                      .map((team, i) => (
                        <TournamentSummaryCard
                          key={team.id}
                          ariaLabel={`Team card for ${team.id}`}
                          color={team.color}
                          gamemode="Team"
                          games={team.members[0]?.games ?? []}
                          members={team.members}
                          position={i + 1}
                          totalTime={team.totalTime}
                          variant="highlight"
                        />
                      ))}
                </CardsContainer>
                <div className={styles.ctaContainer}>
                  <Button
                    as="a"
                    colorName="primary"
                    href={`tournaments/${item.tournament.id}`}
                    variant="outline"
                  >
                    See all tournament details
                  </Button>
                </div>
              </Fragment>
            )
          })}
        </PageContainer>
      ))}
    </>
  )
}
