import { screen } from '@testing-library/react'
import Navbar from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    renderWithTheme(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })
})
