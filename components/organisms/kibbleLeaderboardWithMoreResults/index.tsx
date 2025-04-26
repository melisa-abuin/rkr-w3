'use client'

import { useState, useEffect } from 'react'
import { kibbleColumns } from '@/constants'
import { useToast } from '@/hooks/useToast'
import Table from '@/components/molecules/table'
import RowCards from '@/components/molecules/rowCards'
import { DetailedPlayerStats } from '@/interfaces/player'
import FloatingKibble from './components/floatingKibble'

export default function KibbleLeaderboardWithMoreResults() {
  const [filteredData, setFilteredData] = useState<
    DetailedPlayerStats[] | undefined
  >()
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true)

      // TODO: create helper or what about react query?
      try {
        const response = await fetch('/api/kibbleLeaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setFilteredData(result)
      } catch (error) {
        showToast(
          `Couldn't load the kibbles leaderboard, please try again later.`,
        )
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredData()
  }, [showToast])

  return (
    <>
      <FloatingKibble />
      <RowCards data={filteredData?.slice(0, 5)} loading={loading} />
      <Table
        columns={kibbleColumns}
        data={
          filteredData
            ?.map((elem) => ({
              battleTag: elem.battleTag,
              ...elem.kibbles,
            }))
            .slice(5, 20) || []
        }
        loading={loading}
      />
    </>
  )
}
