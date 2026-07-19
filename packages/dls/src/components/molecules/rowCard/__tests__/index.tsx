import { render, screen } from '@testing-library/react'
import RowCard from '..'

describe('RowCard', () => {
  it('renders children', () => {
    render(
      <RowCard>
        <p>Row content</p>
      </RowCard>,
    )

    expect(screen.getByText('Row content')).toBeInTheDocument()
  })

  it('uses default aria-label when no position is provided', () => {
    render(
      <RowCard>
        <p>Row content</p>
      </RowCard>,
    )

    expect(screen.getByLabelText('Row card')).toBeInTheDocument()
  })

  it('uses position-based default aria-label when position is provided', () => {
    render(
      <RowCard position={1}>
        <p>Row content</p>
      </RowCard>,
    )

    expect(screen.getByLabelText('Position card 1')).toBeInTheDocument()
  })

  it('uses custom aria-label when provided', () => {
    render(
      <RowCard ariaLabel="Custom row label" position={2}>
        <p>Row content</p>
      </RowCard>,
    )

    expect(screen.getByLabelText('Custom row label')).toBeInTheDocument()
  })

  it('does not render position number when position is not provided', () => {
    render(
      <RowCard>
        <p>Row content</p>
      </RowCard>,
    )

    expect(screen.queryByText('1')).not.toBeInTheDocument()
  })

  it('renders position number when position is provided', () => {
    render(
      <RowCard position={1}>
        <p>Row content</p>
      </RowCard>,
    )

    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
