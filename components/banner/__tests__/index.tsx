import { screen } from '@testing-library/react'
import Banner from '..'
import { discordJoinLink } from '@/constants'
import { renderWithTheme } from '@/utils/renderWithTheme'

jest.mock('@/hooks/useFetch', () => ({
  useFetch: jest.fn(),
}))

describe('Banner', () => {
  const mockUseFetch = jest.requireMock('@/hooks/useFetch').useFetch

  beforeEach(() => {
    mockUseFetch.mockReturnValue({
      data: null,
      error: null,
      loading: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the title and description', () => {
    renderWithTheme(<Banner />)

    expect(screen.getByText('Run Kitty Run')).toBeInTheDocument()
    expect(
      screen.getByText(
        /A Warcraft 3 custom map where teamwork and agility guide your kitties through deadly obstacles/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the Discord invitation image', () => {
    renderWithTheme(<Banner />)

    const discordImage = screen.getByAltText('discord invitation')
    expect(discordImage).toBeInTheDocument()
    expect(discordImage.closest('a')).toHaveAttribute('href', discordJoinLink)
  })

  it('shows loading message when data is being fetched', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      error: null,
      loading: true,
    })

    renderWithTheme(<Banner />)

    expect(screen.getByText('loading...')).toBeInTheDocument()
  })

  it('displays the member and presence counts when data is fetched', () => {
    mockUseFetch.mockReturnValue({
      data: {
        approximate_member_count: '1000',
        approximate_presence_count: '200',
      },
      error: null,
      loading: false,
    })

    renderWithTheme(<Banner />)

    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
  })

  it('does not show the loading message after data is fetched', () => {
    mockUseFetch.mockReturnValue({
      data: {
        approximate_member_count: '1000',
        approximate_presence_count: '200',
      },
      error: null,
      loading: false,
    })

    renderWithTheme(<Banner />)

    expect(screen.queryByText('loading...')).not.toBeInTheDocument()
  })

  it('handles API errors gracefully', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      error: true,
      loading: false,
    })

    renderWithTheme(<Banner />)

    expect(screen.queryByText('loading...')).not.toBeInTheDocument()
    expect(screen.queryByText('kitties - ')).not.toBeInTheDocument()
  })
})
