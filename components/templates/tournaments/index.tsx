'use client'

import Button from '@/components/atoms/button'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { formatDateToLocale } from '@/utils'
import RowCards from './components/rowCards'
import { Tournaments as TournamentsInterface } from '@/interfaces/tournament'
import { Fragment } from 'react/jsx-runtime'
import { CTAContainer } from './styled'

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
              <RowCards item={item} />
              <CTAContainer>
                <Button
                  as="a"
                  href={`tournaments/${item.tournament.id}`}
                  variant="outline"
                  colorName="primary"
                >
                  See all tournament details
                </Button>
              </CTAContainer>
            </Fragment>
          ))}
        </PageContainer>
      ))}
    </>
  )
}
