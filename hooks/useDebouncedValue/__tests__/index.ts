import { renderHook, act } from '@testing-library/react'
import { useDebouncedValue } from '..'

jest.useFakeTimers()

describe('useDebouncedValue', () => {
  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('should update value after the debounce delay', () => {
    let value = 'a'
    const { result, rerender } = renderHook(() => useDebouncedValue(value, 300))

    expect(result.current).toBe('a')

    value = 'b'
    rerender()

    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('b')
  })
})
