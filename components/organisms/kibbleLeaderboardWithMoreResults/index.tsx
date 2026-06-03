'use client'

import { kibbleColumnsWithRender, KibbleRow } from '@/constants/tableColumns'
import Table from '@/components/molecules/table'
import { Player } from '@/interfaces/player'
import dynamic from 'next/dynamic'
import KibbleRowCards from './components/kibbleRowCards'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { apiUrl } from '@/constants'

const FloatingKibble = dynamic(() => import('./components/floatingKibble'), {
  ssr: false,
})

export default function KibbleLeaderboardWithMoreResults() {
  const { data, isFetching, error } = useApiQuery<Player[]>(
    `${apiUrl}/api/PlayerStats/kibbleleaderboard`,
    undefined,
    {
      enabled: true,
    },
  )

  useQueryErrorToast(
    error,
    `Couldn't load the kibbles leaderboard, please try again later.`,
  )

  return (
    <>
      <FloatingKibble />
      <KibbleRowCards data={data?.slice(0, 5)} loading={isFetching} />
      <Table<KibbleRow>
        columns={kibbleColumnsWithRender}
        data={
          data
            ?.map((elem) => ({
              battleTag: elem.battleTag,
              ...elem.kibbles,
            }))
            .slice(5, 20) || []
        }
        loading={isFetching}
      />
    </>
  )
}
