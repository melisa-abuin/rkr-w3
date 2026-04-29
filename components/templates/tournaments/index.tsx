'use client'

import Button from '@/components/atoms/button'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { formatDateToLocale } from '@/utils'
import TournamentSummary from './components/tournamentSummary'
import { Tournaments as TournamentsInterface } from '@/interfaces/tournament'
import { Fragment } from 'react/jsx-runtime'
import styles from './index.module.css'

interface Props {
  data: TournamentsInterface[]
}

export default function Tournaments({ data }: Props) {
  return (
    <>
      <PageContainer>
        <PageHeader
          description="tournaments are events organized by the community everyone is welcome to participate"
          title="Tournaments"
        />
      </PageContainer>
      {data.map((group, index) => (
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
