import React from 'react'
import { screen } from '@testing-library/react'
import Paws from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Paws component', () => {
  it('renders 1 paw for normal difficulty', () => {
    renderWithTheme(<Paws difficulty="normal" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(1)
  })

  it('renders 2 paws for hard difficulty', () => {
    renderWithTheme(<Paws difficulty="hard" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(2)
  })

  it('renders 3 paws for impossible difficulty', () => {
    renderWithTheme(<Paws difficulty="impossible" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(3)
  })

  it('returns null for invalid difficulty', () => {
    const { container } = renderWithTheme(<Paws difficulty="unknown" />)
    expect(container.firstChild).toBeNull()
  })

  it('is case-insensitive with difficulty', () => {
    renderWithTheme(<Paws difficulty="HaRd" />)
    const paws = screen.getAllByRole('img')
    expect(paws).toHaveLength(2)
  })
})
