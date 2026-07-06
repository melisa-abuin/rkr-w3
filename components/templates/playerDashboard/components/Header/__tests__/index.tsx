import { useApiQuery } from '@/hooks/useApiQuery'
import { mockTops } from '@/mocks/data/playerStats'
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

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockTops,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<Header {...defaultProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders the formatted skin badge', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockTops,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<Header {...defaultProps} />)
    expect(screen.getByText('Formatted HuntresKitty')).toBeInTheDocument()
  })

  it('renders the color badge with correct text and style', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockTops,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<Header {...defaultProps} />)
    expect(screen.getByText('red kitty')).toBeInTheDocument()
  })

  it('does not render skin badge if skin is not provided', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockTops,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<Header {...defaultProps} skin="" />)
    expect(screen.queryByText(/Formatted/)).not.toBeInTheDocument()
  })

  it('does not render color badge if color is not provided', () => {
    mockUseApiQuery.mockReturnValue({
      data: mockTops,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useApiQuery>)
    render(<Header {...defaultProps} color={null} />)
    expect(screen.queryByText(/^red kitty$/)).not.toBeInTheDocument()
  })
})
