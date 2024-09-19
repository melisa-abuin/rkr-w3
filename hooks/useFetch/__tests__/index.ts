import { renderHook } from '@testing-library/react-hooks'
import { useFetch } from '..'

global.fetch = jest.fn()

describe('useFetch hook', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useFetch('https://example.com/api'))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('should return data after a successful fetch', async () => {
    const mockData = { message: 'Success' }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://example.com/api'),
    )

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
  })

  it('should handle fetch errors', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'))

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://example.com/api'),
    )

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBe('Fetch failed')
  })

  it('should throw an error for non-OK responses', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    })

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://example.com/api'),
    )

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBe('HTTP error! Status: 404')
  })
})
