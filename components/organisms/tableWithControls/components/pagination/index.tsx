import React from 'react'
import { PageButton, PaginationContainer } from './styled'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pagesList = Array.from({ length: totalPages }, (_, i) => i + 1)
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }
  return (
    <PaginationContainer>
      <PageButton
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>

      {pagesList.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => changePage(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationContainer>
  )
}
