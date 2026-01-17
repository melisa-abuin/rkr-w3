import { screen, waitFor, fireEvent } from '@testing-library/react'
import BestGamesWithControls from '..'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { renderWithTheme } from '@/utils/renderWithTheme'
import { mockParsedGameStats } from '@/constants'

jest.mock('@/hooks/useApiQuery')
jest.mock('@/hooks/useQueryErrorToast')

const mockUseApiQuery = useApiQuery as jest.Mock
const mockUseQueryErrorToast = useQueryErrorToast as jest.Mock

describe('BestGamesWithControls', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    mockUseApiQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      error: null,
    })

    renderWithTheme(<BestGamesWithControls />)

    expect(screen.getAllByRole('progressbar')).not.toHaveLength(0)
  })

  it('renders data when loaded', async () => {
    mockUseApiQuery.mockReturnValue({
      data: mockParsedGameStats,
      isFetching: false,
      error: null,
    })

    renderWithTheme(<BestGamesWithControls />)

    expect(await screen.findAllByText('Matt')).not.toHaveLength(0)
    expect(screen.getAllByText(/normal/i).length).toBeGreaterThan(0)
  })

  it('calls useQueryErrorToast on error', () => {
    const error = new Error('Test error')
    mockUseApiQuery.mockReturnValue({
      data: [],
      isFetching: false,
      error,
    })

    renderWithTheme(<BestGamesWithControls />)

    expect(mockUseQueryErrorToast).toHaveBeenCalledWith(
      error,
      expect.stringContaining("Couldn't load best game times"),
    )
  })

  it('filters by difficulty when a badge is clicked', async () => {
    mockUseApiQuery.mockReturnValue({
      data: mockParsedGameStats,
      isFetching: false,
      error: null,
    })

    renderWithTheme(<BestGamesWithControls />)

    const badge = screen.getByRole('button', { name: /normal/i })
    fireEvent.click(badge)

    await waitFor(() => {
      expect(mockUseApiQuery).toHaveBeenCalledWith(
        expect.stringContaining('/api/gameTimes?difficulty=normal'),
        undefined,
        expect.objectContaining({ enabled: true }),
      )
    })
  })
})
