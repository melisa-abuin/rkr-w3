import { renderHook, waitFor } from '@testing-library/react'
import { useDownloadStats } from '..'
import { QueryProvider } from '@/hooks/useQuery'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryProvider>{children}</QueryProvider>
)

describe('useDownloadStats', () => {
  it('calls the API and returns a blob', async () => {
    const fakeBlob = new Blob(['test content'], { type: 'text/plain' })
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(fakeBlob),
    })

    const { result } = renderHook(() => useDownloadStats(), {
      wrapper: Wrapper,
    })

    result.current.mutate('Player#1234')

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(fetch).toHaveBeenCalledWith(
        '/api/downloadPlayerStats/Player%231234',
      )
    })
  })

  it('handles errors', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const { result } = renderHook(() => useDownloadStats(), {
      wrapper: Wrapper,
    })

    result.current.mutate('Player#5678')

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error?.message).toContain('Download failed')
    })
  })
})
