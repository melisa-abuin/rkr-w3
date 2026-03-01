'use client'

import Button from '@/components/atoms/button'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { formatDateToLocale } from '@/utils'
import RowCards from './components/rowCards'
import { Tournaments as TournamentsInterface } from '@/interfaces/tournament'

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
            <RowCards key={item.tournament.id} item={item} />
          ))}
          <div style={{ paddingTop: 16 }}>
            <Button onClick={() => {}} variant="outline" colorName="primary">
              See all tournament details
            </Button>
          </div>
        </PageContainer>
      ))}
    </>
  )
}
