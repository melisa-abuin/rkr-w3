import { screen } from '@testing-library/react'
import Banner from '..'
import { discordJoinLink } from '@/constants'
import { renderWithTheme } from '@/utils/renderWithTheme'

const discordDataMock = {
  data: {
    approximateMemberCount: '10',
    approximatePresenceCount: '5',
  },
  error: null,
  loading: false,
}

describe('Banner', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the title and description', () => {
    renderWithTheme(<Banner discordData={discordDataMock} />)

    expect(screen.getByText('Run Kitty Run')).toBeInTheDocument()
    expect(
      screen.getByText(
        /A Warcraft 3 custom map where teamwork and agility guide your kitties through deadly obstacles/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the Discord invitation image', () => {
    renderWithTheme(<Banner discordData={discordDataMock} />)

    const discordImage = screen.getByAltText('discord invitation')
    expect(discordImage).toBeInTheDocument()
    expect(discordImage.closest('a')).toHaveAttribute('href', discordJoinLink)
  })

  it('displays the member and presence counts when data is fetched', () => {
    renderWithTheme(<Banner discordData={discordDataMock} />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('handles API errors gracefully', () => {
    const discordDataMockError = {
      data: null,
      error: 'There was an issue while fetching discord data',
      loading: false,
    }
    renderWithTheme(<Banner discordData={discordDataMockError} />)

    expect(screen.queryByText('loading...')).not.toBeInTheDocument()
    expect(screen.queryByText('kitties - ')).not.toBeInTheDocument()
  })
})
