'use client'

import Pagination from '@rkr/dls/components/molecules/pagination'
import { usePageViewFilters } from '../../../../hooks/usePageViewFilters'

interface PageViewPaginationProps {
  currentPage: number
  totalPages: number
}

export default function PageViewPagination({
  currentPage,
  totalPages,
}: PageViewPaginationProps) {
  const { updateFilters } = usePageViewFilters()

  if (totalPages <= 1) return null

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => updateFilters({ page })}
    />
  )
}
