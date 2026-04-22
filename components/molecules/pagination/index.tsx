import React from 'react'
import styles from './index.module.css'
import Button from '@/components/atoms/button'
import { Chevron } from '@/components/icons/chevron'

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
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {currentPage > 1 && (
          <>
            <div className={styles.desktopButtonContainer}>
              <Button variant="ghost" onClick={() => changePage(1)}>
                First
              </Button>
              <Button
                variant="ghost"
                onClick={() => changePage(currentPage - 1)}
              >
                Previous
              </Button>
            </div>
            <div
              className={styles.mobileButtonContainer}
              onClick={() => changePage(currentPage - 1)}
            >
              <Chevron fill="var(--color-primary)" height={16} width={16} />
            </div>
          </>
        )}
        <div>
          {pagesList
            .slice(
              currentPage > pageOffsetToShow
                ? currentPage - pageOffsetToShow
                : 0,
              currentPage + pageOffsetToShow,
            )
            .map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'solid' : 'ghost'}
                onClick={() => changePage(page)}
              >
                {page}
              </Button>
            ))}
        </div>
        {currentPage < totalPages && (
          <>
            <div className={styles.desktopButtonContainer}>
              <Button
                variant="ghost"
                onClick={() => changePage(currentPage + 1)}
              >
                Next
              </Button>
              <Button variant="ghost" onClick={() => changePage(totalPages)}>
                Last
              </Button>
            </div>
            <div
              className={styles.mobileButtonContainer}
              onClick={() => changePage(currentPage + 1)}
            >
              <Chevron
                flipped
                fill="var(--color-primary)"
                height={16}
                width={16}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
