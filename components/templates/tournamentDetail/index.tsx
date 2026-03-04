'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { Tournament as TournamentInterface } from '@/interfaces/tournament'
import { formatDateToLocale } from '@/utils'
import RowCards from './components/rowCards'

interface Props {
  data: TournamentInterface
}

export default function Tournaments({ data }: Props) {
  return (
    <>
      <PageContainer>
        <PageHeader
          description=""
          title={`${formatDateToLocale(data.tournament.datetime, true)} 
                      ${data.tournament.gamemode} Tournament`}
        />
        <PageContainer marginBottom={16}>
          <RowCards item={data} />
        </PageContainer>
      </PageContainer>
    </>
  )
}
