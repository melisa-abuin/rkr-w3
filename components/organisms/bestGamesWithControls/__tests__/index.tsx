import { bestGameTimesTopApi } from '@/constants'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { mockBestGameTimes as mockParsedGameStats } from '@/mocks/data/bestGameTimes'
import { server } from '@/mocks/server'
import { renderWithClient } from '@/mocks/testUtils'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import BestGamesWithControls from '..'

vi.mock('@/hooks/useQueryErrorToast')

const mockUseQueryErrorToast = vi.mocked(useQueryErrorToast)
const bestGameTimesTopPath = bestGameTimesTopApi.split('?')[0]

describe('BestGamesWithControls', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    renderWithClient(<BestGamesWithControls />)

    expect(screen.getAllByRole('progressbar')).not.toHaveLength(0)
  })

  it('renders data when loaded', async () => {
    renderWithClient(<BestGamesWithControls />)

    expect(await screen.findAllByText('Matt')).not.toHaveLength(0)
    expect(screen.getAllByText(/normal/i).length).toBeGreaterThan(0)
  })

  it('calls useQueryErrorToast on error', async () => {
    server.use(
      http.get(
        bestGameTimesTopPath,
        () => new HttpResponse(null, { status: 500 }),
      ),
    )

    renderWithClient(<BestGamesWithControls />)

    await waitFor(() => {
      expect(mockUseQueryErrorToast).toHaveBeenCalledWith(
        expect.any(Error),
        expect.stringContaining("Couldn't load best game times"),
      )
    })
  })

  it('filters by difficulty when a badge is clicked', async () => {
    let lastRequestUrl = ''
    server.use(
      http.get(bestGameTimesTopPath, ({ request }) => {
        lastRequestUrl = request.url
        return HttpResponse.json(mockParsedGameStats)
      }),
    )

    renderWithClient(<BestGamesWithControls />)
    await screen.findAllByText('Matt')

    fireEvent.click(screen.getByRole('button', { name: /normal/i }))

    await waitFor(() => {
      expect(lastRequestUrl).toContain('difficulty=normal')
    })
  })
})
