import { screen } from '@testing-library/react'
import MobileNavbar from '..'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/utils/renderWithTheme'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('@/hooks/useIsScrollAtTop', () => ({
  useIsScrollAtTop: jest.fn(),
}))

function mockMatchMedia(matches: boolean) {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
}

const mockUseIsScrollAtTop = jest.requireMock(
  '@/hooks/useIsScrollAtTop',
).useIsScrollAtTop

describe('MobileNavbar', () => {
  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false)
    mockUseIsScrollAtTop.mockReturnValue([true])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the hamburger menu icon and opens the menu', async () => {
    const user = userEvent.setup()
    renderWithTheme(<MobileNavbar />)

    const menuIcon = screen.getByAltText('hamburger menu')
    expect(menuIcon).toBeInTheDocument()

    await user.click(menuIcon)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('How To Play')).toBeInTheDocument()
    expect(screen.getByText('Challenges')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Close modal'))
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })
})