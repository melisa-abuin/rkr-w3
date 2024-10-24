'use client'

import Table from '@/components/table'
const data = [
  { name: 'Player1', saves: 10, deaths: 2 },
  { name: 'Player2', saves: 5, deaths: 6 },
  { name: 'Player3', saves: 7, deaths: 3 },
]

export default function Leaderboard() {
  return (
    <main>
      <Table data={data} />
    </main>
  )
}
