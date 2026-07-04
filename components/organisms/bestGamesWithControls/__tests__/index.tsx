import { bestGameTimesTopApi } from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { mockBestGameTimes as mockParsedGameStats } from '@/mocks/data/bestGameTimes'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import BestGamesWithControls from '..'

vi.mock('@/hooks/useApiQuery')
vi.mock('@/hooks/useQueryErrorToast')

const mockUseApiQuery = vi.mocked(useApiQuery)
const mockUseQueryErrorToast = vi.mocked(useQueryErrorToast)

describe('BestGamesWithControls', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    mockUseApiQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      error: null,
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<BestGamesWithControls />)

    expect(screen.getAllByRole('progressbar')).not.toHaveLength(0)
  })

  it('renders data when loaded', async () => {
    mockUseApiQuery.mockReturnValue({
      data: mockParsedGameStats,
      isFetching: false,
      error: null,
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<BestGamesWithControls />)

    expect(await screen.findAllByText('Matt')).not.toHaveLength(0)
    expect(screen.getAllByText(/normal/i).length).toBeGreaterThan(0)
  })

  it('calls useQueryErrorToast on error', () => {
    const error = new Error('Test error')
    mockUseApiQuery.mockReturnValue({
      data: [],
      isFetching: false,
      error,
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<BestGamesWithControls />)

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
    } as unknown as ReturnType<typeof useApiQuery>)

    render(<BestGamesWithControls />)

    const badge = screen.getByRole('button', { name: /normal/i })
    fireEvent.click(badge)

    await waitFor(() => {
      expect(mockUseApiQuery).toHaveBeenCalledWith(
        expect.stringContaining(`${bestGameTimesTopApi}&difficulty=normal`),
        undefined,
        expect.objectContaining({ enabled: true }),
      )
    })
  })
})
