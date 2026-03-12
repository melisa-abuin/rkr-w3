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
    renderWithTheme(<DesktopNavbar hasTransparentStyle />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })

  it('applies the selected style to the current page link', () => {
    mockUsePathname.mockReturnValue('/leaderboard')

    renderWithTheme(<DesktopNavbar hasTransparentStyle={false} />)

    const challengesLink = screen.getByText('Leaderboard')
    const styles = getComputedStyle(challengesLink)

    expect(styles.fontWeight).toBe('var( --font-weight-bold )')
  })
})
