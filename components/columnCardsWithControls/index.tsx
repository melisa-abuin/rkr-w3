'use client'

import { BestTime } from '@/interfaces/player'
import ColumnCards from '../columnCards'
import { PageContainer } from '../pageContainer'
import { Badges } from '../badges'
import { BadgesContainer } from './styled'

interface Data {
  player: string
  data: number | BestTime
}

interface Props {
  data?: { category: string; data: Data[]; key: string }[]
  title: string
  viewAllKey: 'overview' | 'time'
}

export default function ColumnCardsWithControls({
  data,
  viewAllKey,
  title,
}: Props) {
  return (
    <PageContainer
      ariaLabelledby="columns-time-title"
      marginTop={32}
      title={title}
    >
      <BadgesContainer>
        <Badges
          onClick={() => console.log('hey')}
          options={['normal', 'hard', 'impossible', 'all']}
          selected={undefined}
        />
      </BadgesContainer>

      <ColumnCards data={data} viewAllKey={viewAllKey} />
    </PageContainer>
  )
}
