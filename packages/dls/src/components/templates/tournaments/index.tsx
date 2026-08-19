'use client'

import Button from '@/components/atoms/button'
import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { TournamentApi } from '@/interfaces/tournament'
import { formatDateToLocale, groupTournamentsByGroupId } from '@/utils'
import { Fragment } from 'react/jsx-runtime'
import TournamentSummary from './components/tournamentSummary'
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
          {group.map((item) => (
            <Fragment key={item.tournament.id}>
              <TournamentSummary item={item} />
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
          ))}
        </PageContainer>
      ))}
    </>
  )
}
