import { render, screen } from '@testing-library/react'
import type { BarItem } from '..'
import Bars from '..'

const items: BarItem[] = [
  { label: 'Wins', percentage: 75, value: 30 },
  { label: 'Losses', percentage: 25, value: 10 },
]

describe('Bars', () => {
  it('renders a row for each item', () => {
    render(<Bars items={items} />)
    expect(screen.getByText('Wins')).toBeInTheDocument()
    expect(screen.getByText('Losses')).toBeInTheDocument()
  })

  it('renders the value for each item', () => {
    render(<Bars items={items} />)
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('sets the fill width based on percentage', () => {
    const { container } = render(<Bars items={items} />)
    const fills = container.querySelectorAll('[style]')
    expect(fills[0]).toHaveAttribute('style', 'width: 75%;')
    expect(fills[1]).toHaveAttribute('style', 'width: 25%;')
  })

  it('renders nothing when items is empty', () => {
    const { container } = render(<Bars items={[]} />)
    expect(container.firstChild?.childNodes).toHaveLength(0)
  })
})
