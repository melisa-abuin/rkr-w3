import { act, render, screen } from '@testing-library/react'
import { useElementInView } from '..'

const HookHarness = ({ offsetTop = 0 }: { offsetTop?: number }) => {
  const { isElementInView, elementRef } = useElementInView(offsetTop)

  return (
    <h1
      ref={elementRef}
      data-testid="target"
      data-in-view={isElementInView ? 'true' : 'false'}
    >
      Title
    </h1>
  )
}

describe('useElementInView', () => {
  const originalIntersectionObserver = global.IntersectionObserver
  let observeMock: jest.Mock
  let disconnectMock: jest.Mock
  let intersectionCallback: IntersectionObserverCallback
  let observerOptions: IntersectionObserverInit | undefined

  beforeEach(() => {
    observeMock = jest.fn()
    disconnectMock = jest.fn()

    global.IntersectionObserver = jest
      .fn()
      .mockImplementation(
        (
          cb: IntersectionObserverCallback,
          options?: IntersectionObserverInit,
        ) => {
          intersectionCallback = cb
          observerOptions = options

          return {
            observe: observeMock,
            disconnect: disconnectMock,
            unobserve: jest.fn(),
            takeRecords: jest.fn(() => []),
            root: null,
            rootMargin: options?.rootMargin || '0px',
            thresholds: Array.isArray(options?.threshold)
              ? options.threshold
              : [options?.threshold || 0],
          }
        },
      ) as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver
    jest.clearAllMocks()
  })

  it('should start as in view and observe the element', () => {
    render(<HookHarness offsetTop={90} />)

    expect(screen.getByTestId('target')).toHaveAttribute('data-in-view', 'true')
    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(observeMock).toHaveBeenCalledTimes(1)
    expect(observerOptions).toEqual({
      root: null,
      threshold: 0,
      rootMargin: '-90px 0px 0px 0px',
    })
  })

  it('should update visibility when observer callback fires', () => {
    render(<HookHarness offsetTop={90} />)

    act(() => {
      intersectionCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(screen.getByTestId('target')).toHaveAttribute(
      'data-in-view',
      'false',
    )

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(screen.getByTestId('target')).toHaveAttribute('data-in-view', 'true')
  })

  it('should disconnect observer on unmount', () => {
    const { unmount } = render(<HookHarness offsetTop={90} />)

    unmount()

    expect(disconnectMock).toHaveBeenCalledTimes(1)
  })

  it('should not crash when IntersectionObserver is unavailable', () => {
    global.IntersectionObserver =
      undefined as unknown as typeof IntersectionObserver

    render(<HookHarness offsetTop={90} />)

    expect(screen.getByTestId('target')).toHaveAttribute('data-in-view', 'true')
  })
})
