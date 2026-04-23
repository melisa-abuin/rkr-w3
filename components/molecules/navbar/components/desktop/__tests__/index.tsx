import { render, screen } from '@testing-library/react'
import DesktopNavbar from '..'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const mockUsePathname = jest.requireMock('next/navigation').usePathname

describe('DesktopNavbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders all navigation links', () => {
    render(<DesktopNavbar hasTransparentStyle />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })

  it('applies the selected style to the current page link', () => {
    mockUsePathname.mockReturnValue('/leaderboard')

    render(<DesktopNavbar hasTransparentStyle={false} />)

    const challengesLink = screen.getByText('Leaderboard')

    expect(challengesLink.closest('li')).toHaveClass('selected')
  })
})
