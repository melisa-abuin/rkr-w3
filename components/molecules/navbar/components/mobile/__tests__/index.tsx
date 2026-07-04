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

describe('MobileNavbar', () => {
  beforeEach(() => {
    mockUseIsScrollAtTop.mockReturnValue([true, vi.fn()])
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the hamburger menu icon and opens the menu', async () => {
    render(<MobileNavbar />)

    const menuIcon = screen.getByAltText('hamburger menu')
    expect(menuIcon).toBeInTheDocument()

    await userEvent.click(menuIcon)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()

    await userEvent.click(screen.getByLabelText('Close modal'))
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })
})
