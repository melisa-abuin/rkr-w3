import { screen } from '@testing-library/react'
import Navbar from '..'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/utils/renderWithTheme'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('@/hooks/useIsScrollAtTop', () => ({
  useIsScrollAtTop: jest.fn(),
}))

const mockUsePathname = jest.requireMock('next/navigation').usePathname
const mockUseIsScrollAtTop = jest.requireMock(
  '@/hooks/useIsScrollAtTop',
).useIsScrollAtTop

describe('Navbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
    mockUseIsScrollAtTop.mockReturnValue([true])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the brand logo and links', () => {
    renderWithTheme(<Navbar />)

    const logo = screen.getByAltText('brand logo')
    expect(logo).toBeInTheDocument()

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('How To Play')).toBeInTheDocument()
    expect(screen.getByText('Challenges')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })

  it('applies selected style to the current page link', () => {
    mockUsePathname.mockReturnValue('/challenges')
    renderWithTheme(<Navbar />)

    const challengesLink = screen.getByText('Challenges')
    const styles = getComputedStyle(challengesLink.parentElement!)

    expect(styles.borderBottom).toBe('2px solid #050505')
  })

  it('shows the transparent navbar on the homepage when at the top', () => {
    mockUsePathname.mockReturnValue('/')
    mockUseIsScrollAtTop.mockReturnValue([true])

    renderWithTheme(<Navbar />)

    const nav = screen.getByRole('navigation')
    const styles = getComputedStyle(nav)

    expect(styles.background).toBe('transparent')
  })

  it('does not show the transparent navbar when not at the top', () => {
    mockUseIsScrollAtTop.mockReturnValue([false])

    renderWithTheme(<Navbar />)

    const nav = screen.getByRole('navigation')

    const styles = getComputedStyle(nav)

    expect(styles.background).toBe('rgb(255, 255, 255)')
  })
})
