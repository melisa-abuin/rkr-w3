'use client'

import Table from '@/components/molecules/table'
import { playerStatsKibbleLeaderboardApi } from '@/constants'
import { kibbleColumnsWithRender, KibbleRow } from '@/constants/tableColumns'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { KibbleLeaderboard } from '@/interfaces/leaderboard'
import dynamic from 'next/dynamic'
import KibbleRowCards from './components/kibbleRowCards'

const FloatingKibble = dynamic(() => import('./components/floatingKibble'), {
  ssr: false,
})

export default function KibbleLeaderboardWithMoreResults() {
  const { data, isFetching, error } = useApiQuery<KibbleLeaderboard[]>(
    playerStatsKibbleLeaderboardApi,
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
