'use client'

import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Table from '../table'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface TableProps {
  data?: PlayersStats
  loading?: boolean
  title: string
  columns: Array<{
    title: string
    key: keyof PlayerStats
  }>
  statsLink?: string
}

export default function TableWithControls({
  data,
  loading = false,
  columns,
  statsLink,
  title,
}: TableProps) {
  const searchParams = useSearchParams()

  const dataToShow = useMemo(() => {
    const page = searchParams?.get('page') || 1
    const pageSize = 10
    const initialIndex = (Number(page) - 1) * pageSize

    return data?.slice(initialIndex, initialIndex + pageSize)
  }, [data, searchParams])

  return (
    <Table
      columns={columns}
      loading={loading}
      data={dataToShow}
      statsLink={statsLink}
      title={title}
    />
  )
}
