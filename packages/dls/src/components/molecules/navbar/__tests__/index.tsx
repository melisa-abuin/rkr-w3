import { render, screen } from '@testing-library/react'
import Navbar from '..'

const mockRoutes = {
  home: {
    label: 'Home',
    pathname: '/',
    url: '/',
    target: '_self' as const,
    isNew: false,
    method: 'get' as const,
  },
  leaderboard: {
    label: 'Leaderboard',
    pathname: '/leaderboard',
    url: '/leaderboard',
    target: '_self' as const,
    isNew: false,
    method: 'get' as const,
  },
}

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    render(<Navbar routes={mockRoutes} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })
})
