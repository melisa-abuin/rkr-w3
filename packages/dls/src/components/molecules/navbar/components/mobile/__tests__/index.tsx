import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MobileNavbar from '..'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('@/hooks/useIsScrollAtTop', () => ({
  useIsScrollAtTop: vi.fn(),
}))

const mockUseIsScrollAtTop = vi.mocked(useIsScrollAtTop)

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

describe('MobileNavbar', () => {
  beforeEach(() => {
    mockUseIsScrollAtTop.mockReturnValue([true, vi.fn()])
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the hamburger menu icon and opens the menu', async () => {
    render(<MobileNavbar routes={mockRoutes} />)

    const menuIcon = screen.getByAltText('hamburger menu')
    expect(menuIcon).toBeInTheDocument()

    await userEvent.click(menuIcon)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()

    await userEvent.click(screen.getByLabelText('Close modal'))
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it.skip('renders a "New" badge for routes marked as isNew after opening menu', async () => {
    render(<MobileNavbar routes={mockRoutes} />)

    await userEvent.click(screen.getByAltText('hamburger menu'))

    expect(screen.getByText('New')).toBeInTheDocument()
  })
})
