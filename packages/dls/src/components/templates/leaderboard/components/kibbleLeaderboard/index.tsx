'use client'

import Table from '@/components/molecules/table'
import RowCardsWithImage from '@/components/organisms/rowCardsWithImage'
import {
  kibbleLeaderboardColumns,
  playerStatsKibbleLeaderboardApi,
} from '@/constants'
import { kibbleColumnsWithRender, KibbleRow } from '@/constants/tableColumns'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import type { KibbleLeaderboard } from '@/interfaces/leaderboard'

export default function KibbleLeaderboard() {
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
      <RowCardsWithImage
        columns={kibbleLeaderboardColumns}
        data={data?.slice(0, 5).map((item) => ({
          ...item,
          ...item.kibbles,
        }))}
        loading={isFetching}
      />
      <Table<KibbleRow>
        columns={kibbleColumnsWithRender}
        data={
          data
            ?.map((item) => ({
              battleTag: item.battleTag,
              ...item.kibbles,
            }))
            .slice(5, 20) || []
        }
        loading={isFetching}
      />
    </>
  )
}
