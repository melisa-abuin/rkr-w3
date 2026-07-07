import { apiUrl } from '@/constants'
import { QueryProvider } from '@/hooks/useQuery'
import { renderHook, waitFor } from '@testing-library/react'
import { useDownloadStats } from '..'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryProvider>{children}</QueryProvider>
)

describe('useDownloadStats', () => {
  it('calls the API and returns a blob', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('{"some":"savedata"}'),
    })

    const { result } = renderHook(() => useDownloadStats(), {
      wrapper: Wrapper,
    })

    result.current.mutate('Player#1234')

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(fetch).toHaveBeenCalledWith(`${apiUrl}/api/RawJson/Player%231234`)
    })
  })

  it('handles errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
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
