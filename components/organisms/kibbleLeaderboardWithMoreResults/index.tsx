'use client'

import { kibbleColumns } from '@/constants'
import Table from '@/components/molecules/table'
import RowCards from '@/components/molecules/rowCards'
import { DetailedPlayerStats } from '@/interfaces/player'
import FloatingKibble from './components/floatingKibble'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

export default function KibbleLeaderboardWithMoreResults() {
  const { data, isFetching, error } = useApiQuery<DetailedPlayerStats[]>(
    '/api/kibbleLeaderboard',
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
      <RowCards data={data?.slice(0, 5)} loading={isFetching} />
      <Table
        columns={kibbleColumns}
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
