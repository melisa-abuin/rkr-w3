import { render, screen } from '@testing-library/react'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import MobileNavbar from '..'
import userEvent from '@testing-library/user-event'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('@/hooks/useIsScrollAtTop', () => ({
  useIsScrollAtTop: vi.fn(),
}))

const mockUseIsScrollAtTop = vi.mocked(useIsScrollAtTop)

describe('MobileNavbar', () => {
  beforeEach(() => {
    mockUseIsScrollAtTop.mockReturnValue([true])
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
