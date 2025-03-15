import React from 'react'
import { OuterContainer, InnerContainer } from './styled'
import Button from '@/components/atoms/button'

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
  const pageOffsetToShow = 3
  const pagesList = Array.from({ length: totalPages }, (_, i) => i + 1)
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <OuterContainer>
      <InnerContainer>
        {currentPage > 1 && (
          <>
            <Button onClick={() => changePage(1)} variant="secondary">
              First
            </Button>
            <Button
              onClick={() => changePage(currentPage - 1)}
              variant="secondary"
            >
              Previous
            </Button>
          </>
        )}

        {pagesList
          .slice(
            currentPage > pageOffsetToShow ? currentPage - pageOffsetToShow : 0,
            currentPage + pageOffsetToShow,
          )
          .map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'primary' : 'secondary'}
              onClick={() => changePage(page)}
            >
              {page}
            </Button>
          ))}
        {currentPage < totalPages && (
          <>
            <Button
              variant="secondary"
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </Button>
            <Button onClick={() => changePage(totalPages)} variant="secondary">
              Last
            </Button>
          </>
        )}
      </InnerContainer>
    </OuterContainer>
  )
}
