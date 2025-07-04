import { screen } from '@testing-library/react'
import Header from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'
import { useApiQuery } from '@/hooks/useApiQuery'

jest.mock('@/hooks/useApiQuery')
jest.mock('@/hooks/useQueryErrorToast')

const mockUseApiQuery = useApiQuery as jest.Mock

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  formatKeyToWord: jest.fn((key) => `Formatted ${key}`),
  hexToRgba: jest.fn((hex, alpha) => `rgba-from-${hex}-alpha-${alpha}`),
}))

describe('<Header />', () => {
  const defaultProps = {
    battleTag: 'HuntresKitty#1234',
    title: 'Test Title',
    color: 'red',
    skin: 'HuntresKitty',
  } as const

  const mockedTops = {
    roundOne: { normal: 0, hard: 0, impossible: 0, label: 'Round One' },
    saves: { all: 0, label: 'Saves' },
    fastestGames: {
      normal: 0,
      hard: 0,
      impossible: 0,
      label: 'Fastest games',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the title', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    renderWithTheme(<Header {...defaultProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders the formatted skin badge', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    renderWithTheme(<Header {...defaultProps} />)
    expect(screen.getByText('Formatted HuntresKitty')).toBeInTheDocument()
  })

  it('renders the color badge with correct text and style', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    renderWithTheme(<Header {...defaultProps} />)
    expect(screen.getByText('red kitty')).toBeInTheDocument()
  })

  it('does not render skin badge if skin is not provided', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })

    renderWithTheme(<Header {...defaultProps} skin="" />)
    expect(screen.queryByText(/Formatted/)).not.toBeInTheDocument()
  })

  it('does not render color badge if color is not provided', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockedTops,
      isFetching: false,
      error: null,
    })
    renderWithTheme(<Header {...defaultProps} color={null} />)
    expect(screen.queryByText(/kitty/)).not.toBeInTheDocument()
  })
})
