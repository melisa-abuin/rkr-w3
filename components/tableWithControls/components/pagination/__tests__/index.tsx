import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import Pagination from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Pagination Component', () => {
  const onPageChangeMock = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the correct number of page buttons', () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    expect(screen.getAllByRole('button')).toHaveLength(7)
  })

  it('should disable the Previous button on the first page', () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    const previousButton = screen.getByText('Previous')
    expect(previousButton).toBeDisabled()
  })

  it('should disable the Next button on the last page', () => {
    renderWithTheme(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('should call onPageChange with the correct page number when a page button is clicked', () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    const pageButton = screen.getByText('3')
    fireEvent.click(pageButton)

    expect(onPageChangeMock).toHaveBeenCalledWith(3)
  })

  it('should call onPageChange with the previous page when Previous is clicked', () => {
    renderWithTheme(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    const previousButton = screen.getByText('Previous')
    fireEvent.click(previousButton)

    expect(onPageChangeMock).toHaveBeenCalledWith(2)
  })

  it('should call onPageChange with the next page when Next is clicked', () => {
    renderWithTheme(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    expect(onPageChangeMock).toHaveBeenCalledWith(4)
  })

  it('should highlight the current page button', () => {
    renderWithTheme(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    )

    const activeButton = screen.getByText('2')
    expect(activeButton).toHaveStyle('background-color: rgb(178, 65, 65)')
  })
})
