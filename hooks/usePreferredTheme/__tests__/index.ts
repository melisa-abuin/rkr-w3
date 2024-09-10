import { renderHook } from '@testing-library/react-hooks'
import { usePreferredTheme } from '@/hooks/usePreferredTheme'
import themes from '@/theme'

function mockMatchMedia(matches: boolean) {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
}

describe('usePreferredTheme hook', () => {
  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false)
  })

  it('should use light theme by default', () => {
    const { result } = renderHook(() => usePreferredTheme())

    const [theme] = result.current

    expect(theme).toEqual(themes.light)
  })

  it('should set dark theme if media query matches dark mode', () => {
    window.matchMedia = mockMatchMedia(true)

    const { result } = renderHook(() => usePreferredTheme())

    const [theme] = result.current

    expect(theme).toEqual(themes.dark)
  })

  it.todo('should handle theme changes when the system preference changes')
})
