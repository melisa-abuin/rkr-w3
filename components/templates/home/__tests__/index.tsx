import { screen } from '@testing-library/react'
import Home from '..'
import { discordJoinLink } from '@/constants'
import { renderWithTheme } from '@/utils/renderWithTheme'
import { useApiQuery } from '@/hooks/useApiQuery'

const discordDataMock = {
  data: {
    approximateMemberCount: '10',
    approximatePresenceCount: '5',
  },
  error: null,
  loading: false,
}

jest.mock('@/hooks/useApiQuery')
jest.mock('@/hooks/useQueryErrorToast')

const mockUseApiQuery = useApiQuery as jest.Mock

describe('Home', () => {
  beforeEach(() => {
    mockUseApiQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      error: null,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the title and description', () => {
    renderWithTheme(<Home discordData={discordDataMock} />)

    expect(screen.getByText('Run Kitty Run')).toBeInTheDocument()
    expect(
      screen.getByText(/The famous Warcraft 3 custom map/i),
    ).toBeInTheDocument()
  })

  it('renders the Discord invitation image', () => {
    renderWithTheme(<Home discordData={discordDataMock} />)

    const discordImage = screen.getByAltText('discord invitation')
    expect(discordImage).toBeInTheDocument()
    expect(discordImage.closest('a')).toHaveAttribute('href', discordJoinLink)
  })

  it('displays the member and presence counts when data is fetched', () => {
    renderWithTheme(<Home discordData={discordDataMock} />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('handles API errors gracefully', () => {
    const discordDataMockError = {
      data: null,
      error: 'There was an issue while fetching discord data',
      loading: false,
    }
    renderWithTheme(<Home discordData={discordDataMockError} />)

    expect(screen.queryByText('loading...')).not.toBeInTheDocument()
    expect(screen.queryByText('kitties - ')).not.toBeInTheDocument()
  })
})
