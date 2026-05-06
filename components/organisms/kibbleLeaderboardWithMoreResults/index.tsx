'use client'

import { kibbleColumnsWithRender, KibbleRow } from '@/constants/tableColumns'
import Table from '@/components/molecules/table'
import { Player } from '@/interfaces/player'
import FloatingKibble from './components/floatingKibble'
import KibbleRowCards from './components/kibbleRowCards'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

export default function KibbleLeaderboardWithMoreResults() {
  const { data, isFetching, error } = useApiQuery<Player[]>(
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
