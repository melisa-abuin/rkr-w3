import { discordJoinLink } from '@/constants'
import { renderWithClient } from '@/mocks/testUtils'
import { screen } from '@testing-library/react'
import Home from '..'

const discordDataMock = {
  data: {
    approximateMemberCount: '10',
    approximatePresenceCount: '5',
  },
  error: null,
  loading: false,
}

vi.mock('@/hooks/useQueryErrorToast')

describe('Home', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title and description', () => {
    renderWithClient(<Home discordData={discordDataMock} />)

    expect(screen.getByText('Run Kitty Run')).toBeInTheDocument()
    expect(
      screen.getByText(/The statistics for the custom map from Warcraft 3/i),
    ).toBeInTheDocument()
  })

  it('renders the Discord invitation image', () => {
    renderWithClient(<Home discordData={discordDataMock} />)

    const discordImage = screen.getByAltText('discord invitation')
    expect(discordImage).toBeInTheDocument()
    expect(discordImage.closest('a')).toHaveAttribute('href', discordJoinLink)
  })

  it('displays the member and presence counts when data is fetched', () => {
    renderWithClient(<Home discordData={discordDataMock} />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('handles API errors gracefully', () => {
    const discordDataMockError = {
      data: null,
      error: 'There was an issue while fetching discord data',
      loading: false,
    }
    renderWithClient(<Home discordData={discordDataMockError} />)

    expect(screen.queryByText('loading...')).not.toBeInTheDocument()
    expect(screen.queryByText('kitties - ')).not.toBeInTheDocument()
  })
})
