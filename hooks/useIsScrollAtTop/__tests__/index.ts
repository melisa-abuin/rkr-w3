import { renderHook, act } from '@testing-library/react'
import { useIsScrollAtTop } from '..'

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', {
    value: 0,
    writable: true,
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('useIsScrollAtTop', () => {
  it('should return true initially when scrollY is 0', () => {
    const { result } = renderHook(() => useIsScrollAtTop())

    expect(result.current[0]).toBe(true)
  })

  it('should return false when scrollY is more than 100', () => {
    const { result } = renderHook(() => useIsScrollAtTop())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current[0]).toBe(false)
  })

  test('should return true when scrollY is less than 100', () => {
    const { result } = renderHook(() => useIsScrollAtTop())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current[0]).toBe(true)
  })
})
