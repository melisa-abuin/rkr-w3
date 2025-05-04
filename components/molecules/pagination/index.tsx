import React from 'react'
import {
  OuterContainer,
  InnerContainer,
  DesktopButtonContainer,
  MobileButtonContainer,
} from './styled'
import Button from '@/components/atoms/button'
import { Chevron } from '@/components/icons/chevron'
import { useTheme } from '@/hooks/useTheme'

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
  const [theme] = useTheme()

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
            <DesktopButtonContainer>
              <Button onClick={() => changePage(1)} variant="ghost">
                First
              </Button>
              <Button
                onClick={() => changePage(currentPage - 1)}
                variant="ghost"
              >
                Previous
              </Button>
            </DesktopButtonContainer>
            <MobileButtonContainer onClick={() => changePage(currentPage - 1)}>
              <Chevron height={16} fill={theme.color.primary} width={16} />
            </MobileButtonContainer>
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
            <DesktopButtonContainer>
              <Button
                variant="ghost"
                onClick={() => changePage(currentPage + 1)}
              >
                Next
              </Button>
              <Button onClick={() => changePage(totalPages)} variant="ghost">
                Last
              </Button>
            </DesktopButtonContainer>
            <MobileButtonContainer onClick={() => changePage(currentPage + 1)}>
              <Chevron
                height={16}
                fill={theme.color.primary}
                width={16}
                flipped
              />
            </MobileButtonContainer>
          </>
        )}
      </InnerContainer>
    </OuterContainer>
  )
}
