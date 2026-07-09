import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import DesktopNavbar from '..'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

const mockUsePathname = vi.mocked(usePathname)

describe('DesktopNavbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders all navigation links', () => {
    render(<DesktopNavbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })

  it('applies the selected style to the current page link', () => {
    mockUsePathname.mockReturnValue('/leaderboard')

    render(<DesktopNavbar />)

    const challengesLink = screen.getByText('Leaderboard')

    expect(challengesLink.closest('li')).toHaveClass('selected')
  })

  it('renders a "New" badge for routes marked as isNew', () => {
    render(<DesktopNavbar />)

    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('does not render a "New" badge for routes not marked as isNew', () => {
    render(<DesktopNavbar />)

    const homeLink = screen.getByText('Home')

    expect(homeLink.closest('li')?.querySelector('[class*="badge"]')).toBeNull()
  })
})
