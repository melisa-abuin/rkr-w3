'use client'

import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Table from '../table'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Pagination from './pagination'
import { pageSize } from '@/constants'

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
  const totalPages = data ? Math.round(data?.length / pageSize) : 0
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  useEffect(() => {
    window.history.pushState(null, '', `?page=${currentPage}`)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [currentPage, router])

  const dataToShow = useMemo(() => {
    const initialIndex = (Number(currentPage) - 1) * pageSize

    return data?.slice(initialIndex, initialIndex + pageSize)
  }, [data, currentPage])
  console.log(totalPages)
  return (
    <>
      <Table
        columns={columns}
        loading={loading}
        data={dataToShow}
        statsLink={statsLink}
        title={title}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  )
}
