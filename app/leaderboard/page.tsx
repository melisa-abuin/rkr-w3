'use client'

import Error from '@/components/error'
import Table from '@/components/table'
import { useFetch } from '@/hooks/useFetch'
import { PlayersStats } from '@/interfaces/player'

export default function Leaderboard() {
  const { data, loading, error } = useFetch<PlayersStats>('/api/scoreboard')

  return (
    <main>{error ? <Error /> : <Table data={data} loading={loading} />}</main>
  )
}
