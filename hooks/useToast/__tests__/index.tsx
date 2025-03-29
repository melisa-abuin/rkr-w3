import { screen, fireEvent, act } from '@testing-library/react'
import { ToastProvider, useToast } from '..'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/utils/renderWithTheme'

const TestComponent = () => {
  const { showToast } = useToast()

  return (
    <div>
      <button onClick={() => showToast('Test message', 2000)}>
        Show Success Toast
      </button>
      <button onClick={() => showToast('Test error', 2000)}>
        Show Error Toast
      </button>
    </div>
  )
}

describe('ToastProvider', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('renders children correctly', async () => {
    renderWithTheme(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    expect(screen.getByText('Show Success Toast')).toBeInTheDocument()
  })

  it('removes toast messages after duration', () => {
    renderWithTheme(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Show Success Toast'))
    expect(screen.getByText('Test message')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.queryByText('Test message')).not.toBeInTheDocument()
  })

  it('removes toast messages after duration', async () => {
    jest.useRealTimers()

    renderWithTheme(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Show Success Toast'))
    expect(screen.getByText('Test message')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Test message'))

    expect(screen.queryByText('Test message')).not.toBeInTheDocument()
  })
})
