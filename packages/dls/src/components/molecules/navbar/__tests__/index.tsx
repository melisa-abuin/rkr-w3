import { render, screen } from '@testing-library/react'
import Navbar from '..'

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    render(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })
})
