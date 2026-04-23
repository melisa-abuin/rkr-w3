import React from 'react'
import { render, screen } from '@testing-library/react'
import Paws from '..'

describe('Paws component', () => {
  it('renders 1 paw for normal difficulty', () => {
    render(<Paws difficulty="normal" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(1)
  })

  it('renders 2 paws for hard difficulty', () => {
    render(<Paws difficulty="hard" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(2)
  })

  it('renders 3 paws for impossible difficulty', () => {
    render(<Paws difficulty="impossible" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(3)
  })

  it('returns null for invalid difficulty', () => {
    const { container } = render(<Paws difficulty="unknown" />)
    expect(container.firstChild).toBeNull()
  })

  it('is case-insensitive with difficulty', () => {
    render(<Paws difficulty="HaRd" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(2)
  })
})
