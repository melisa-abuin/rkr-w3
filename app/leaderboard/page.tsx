'use client'

import Table from '@/components/table'
import { useFetch } from '@/hooks/useFetch'
import { PlayersStats } from '@/interfaces/player'

export default function Leaderboard() {
  const { data, loading, error } = useFetch<PlayersStats>('/api/scoreboard')

  return <main>{!loading && !error && <Table data={data} />}</main>
}
