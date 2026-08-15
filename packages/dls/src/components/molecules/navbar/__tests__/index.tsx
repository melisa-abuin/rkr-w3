import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import { render, screen } from '@testing-library/react'
import Navbar from '..'

vi.mock('next/image', () => ({
  default: vi.fn(({ alt }: { alt: string }) => <img alt={alt} />),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/'),
}))

vi.mock('@/hooks/useIsScrollAtTop', () => ({
  useIsScrollAtTop: vi.fn(),
}))

vi.mocked(useIsScrollAtTop).mockReturnValue([true, vi.fn()])

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
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the logo and navigation links', () => {
    render(<Navbar routes={mockRoutes} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
  })

  it('does not render the announcement when no announcement prop is provided', () => {
    render(<Navbar routes={mockRoutes} />)

    expect(
      screen.queryByRole('button', { name: 'Close announcement' }),
    ).not.toBeInTheDocument()
  })

  it('does not render the announcement when isActive is false', () => {
    render(
      <Navbar
        announcement={{
          isActive: false,
          subtitle: 'Sub',
          title: 'Active Announcement',
        }}
        routes={mockRoutes}
      />,
    )

    expect(screen.queryByText('Active Announcement')).not.toBeInTheDocument()
  })

  it('renders the announcement when isActive is true', () => {
    render(
      <Navbar
        announcement={{
          isActive: true,
          subtitle: 'Sub',
          title: 'Active Announcement',
        }}
        routes={mockRoutes}
      />,
    )

    expect(screen.getByText('Active Announcement')).toBeInTheDocument()
  })

  it('does not render the announcement when withAnnouncement is false', () => {
    render(
      <Navbar
        announcement={{
          isActive: true,
          subtitle: 'Sub',
          title: 'Active Announcement',
        }}
        routes={mockRoutes}
        withAnnouncement={false}
      />,
    )

    expect(screen.queryByText('Active Announcement')).not.toBeInTheDocument()
  })
})
