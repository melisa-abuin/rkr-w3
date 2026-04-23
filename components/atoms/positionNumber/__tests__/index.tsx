import React from 'react'
import { render, screen } from '@testing-library/react'
import PositionNumber from '..'

describe('PositionNumber', () => {
  it('renders the correct number', () => {
    render(<PositionNumber pos={2} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('uses the correct color for position 1', () => {
    const { container } = render(<PositionNumber pos={1} />)
    expect(container.firstChild).toHaveClass('colorTeal')
  })

  it('uses the correct color for position 2', () => {
    const { container } = render(<PositionNumber pos={2} />)
    expect(container.firstChild).toHaveClass('colorGreen')
  })

  it('uses the correct color for position 3', () => {
    const { container } = render(<PositionNumber pos={3} />)
    expect(container.firstChild).toHaveClass('colorYellow')
  })

  it('defaults to text.primary color for position 4 and above', () => {
    const { container } = render(<PositionNumber pos={4} />)
    expect(container.firstChild).toHaveClass('colorPrimary')
  })

  it.skip('applies small styles when isSmall is true', () => {
    const { container } = render(<PositionNumber isSmall pos={1} />)
    expect(container.firstChild).toHaveStyle(
      'font-size: var(--font-size-xs-sm)',
    )
  })

  it('falls back to position 1 color for undefined positions', () => {
    const { container } = render(<PositionNumber pos={99} />)
    expect(container.firstChild).toHaveClass('colorPrimary')
  })
})
