import { render, screen } from '@testing-library/react'
import ColorBadge from '..'

describe('ColorBadge', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders children', () => {
    render(<ColorBadge>Badge Text</ColorBadge>)
    expect(screen.getByText('Badge Text')).toBeInTheDocument()
  })

  it('uses red badge colors by default', () => {
    render(<ColorBadge>Default Badge</ColorBadge>)

    expect(screen.getByText('Default Badge')).toHaveClass('colorRed')
  })

  it('uses provided badge color variant', () => {
    render(<ColorBadge colorName="primary">Primary Badge</ColorBadge>)

    expect(screen.getByText('Primary Badge')).toHaveClass('colorPrimary')
  })

  it('returns null when colorName is null', () => {
    render(<ColorBadge colorName={null}>Hidden Badge</ColorBadge>)

    expect(screen.queryByText('Hidden Badge')).not.toBeInTheDocument()
  })

  it('falls back to red for unknown color', () => {
    render(
      <ColorBadge colorName={'invalid-color' as never}>
        Invalid Badge
      </ColorBadge>,
    )

    expect(screen.getByText('Invalid Badge')).toBeInTheDocument()
    expect(screen.getByText('Invalid Badge')).toHaveClass('colorRed')
  })
})
