import { screen } from '@testing-library/react'
import DesktopNavbar from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

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
    renderWithTheme(<DesktopNavbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('How To Play')).toBeInTheDocument()
    expect(screen.getByText('Challenges')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })

  it('applies the selected style to the current page link', () => {
    mockUsePathname.mockReturnValue('/')

    renderWithTheme(<DesktopNavbar />)

    const challengesLink = screen.getByText('Home')
    const styles = getComputedStyle(challengesLink.parentElement!)

    expect(styles.borderBottom).toBe('2px solid #050505')
  })
})
