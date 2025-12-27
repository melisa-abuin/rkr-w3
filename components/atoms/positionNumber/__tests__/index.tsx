import React from 'react'
import { screen } from '@testing-library/react'
import PositionNumber from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('PositionNumber', () => {
  it('renders the correct number', () => {
    renderWithTheme(<PositionNumber pos={2} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('uses the correct color for position 1', () => {
    const { container } = renderWithTheme(<PositionNumber pos={1} />)
    expect(container.firstChild).toHaveStyle('color: rgb(1, 197, 219)')
  })

  it('uses the correct color for position 2', () => {
    const { container } = renderWithTheme(<PositionNumber pos={2} />)
    expect(container.firstChild).toHaveStyle('color: rgb(0, 64, 255)')
  })

  it('uses the correct color for position 3', () => {
    const { container } = renderWithTheme(<PositionNumber pos={3} />)
    expect(container.firstChild).toHaveStyle('color: rgb(255, 108, 0)')
  })

  it('defaults to text.primary color for position 4 and above', () => {
    const { container } = renderWithTheme(<PositionNumber pos={4} />)
    expect(container.firstChild).toHaveStyle('color: rgb(5, 5, 5)')
  })

  // css var can be used in tests, but the value is not predictable. Anyway, another reason to remove styled components
  it.skip('applies small styles when isSmall is true', () => {
    const { container } = renderWithTheme(<PositionNumber pos={1} isSmall />)
    expect(container.firstChild).toHaveStyle(
      'font-size: var(--font-size-xs-sm)',
    )
  })

  it('falls back to position 1 color for undefined positions', () => {
    const { container } = renderWithTheme(<PositionNumber pos={99} />)
    expect(container.firstChild).toHaveStyle('color: rgb(1, 197, 219)')
  })
})
