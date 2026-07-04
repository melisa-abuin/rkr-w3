import { useApiQuery } from '@/hooks/useApiQuery'
import { render, screen } from '@testing-library/react'
import Header from '..'

vi.mock('@/hooks/useApiQuery')
vi.mock('@/hooks/useQueryErrorToast')

const mockUseApiQuery = vi.mocked(useApiQuery)

vi.mock('@/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils')>()
  return {
    ...actual,
    formatKeyToWord: vi.fn((key) => `Formatted ${key}`),
    hexToRgba: vi.fn((hex, alpha) => `rgba-from-${hex}-alpha-${alpha}`),
  }
})

describe('<Header />', () => {
  const defaultProps = {
    battleTag: 'HuntresKitty#1234',
    title: 'Test Title',
    color: 'red',
    skin: 'HuntresKitty',
  } as const

  const mockedTops = {
    roundOne: { normal: 0, hard: 0, impossible: 0, nightmare: 1 },
    roundTwo: { normal: 1, hard: 1, impossible: 1, nightmare: 1 },
    roundThree: { normal: 1, hard: 1, impossible: 1, nightmare: 1 },
    roundFour: { normal: 1, hard: 1, impossible: 1, nightmare: 1 },
    roundFive: { normal: 1, hard: 1, impossible: 1, nightmare: 1 },
    saves: 0,
    wins: 1,
    highestWinStreak: 1,
    gamesPlayed: 1,
    saveDeathRatio: 1,
    kibbles: 1,
    fastestGames: {
      normal: 0,
      hard: 0,
      impossible: 0,
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    render(<Header {...defaultProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders the formatted skin badge', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    render(<Header {...defaultProps} />)
    expect(screen.getByText('Formatted HuntresKitty')).toBeInTheDocument()
  })

  it('renders the color badge with correct text and style', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    render(<Header {...defaultProps} />)
    expect(screen.getByText('red kitty')).toBeInTheDocument()
  })

  it('does not render skin badge if skin is not provided', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    render(<Header {...defaultProps} skin="" />)
    expect(screen.queryByText(/Formatted/)).not.toBeInTheDocument()
  })

  it('does not render color badge if color is not provided', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })
    render(<Header {...defaultProps} color={null} />)
    expect(screen.queryByText(/^red kitty$/)).not.toBeInTheDocument()
  })
})
