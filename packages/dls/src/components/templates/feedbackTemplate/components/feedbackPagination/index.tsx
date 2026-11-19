'use client'

import Pagination from '@/components/molecules/pagination'
import { usePathname, useRouter } from 'next/navigation'

interface FeedbackPaginationProps {
  currentPage: number
  totalPages: number
}

export default function FeedbackPagination({
  currentPage,
  totalPages,
}: FeedbackPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()

  if (totalPages <= 1) return null

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) =>
        router.replace(page === 1 ? pathname : `${pathname}?page=${page}`, {
          scroll: false,
        })
      }
    />
  )
}
