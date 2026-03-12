import { screen, fireEvent, act } from '@testing-library/react'
import { ToastProvider, useToast } from '..'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/utils/renderWithTheme'

const TestComponent = () => {
  const { showToast } = useToast()

  return (
    <div>
      <button onClick={() => showToast('Test warning', 'warning', 2000)}>
        Show Warning Toast
      </button>
      <button onClick={() => showToast('Test error', 'error', 2000)}>
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

  it('renders children', async () => {
    renderWithTheme(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    expect(screen.getByText('Show Error Toast')).toBeInTheDocument()
  })

  it('removes toast messages after duration', () => {
    renderWithTheme(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Show Error Toast'))
    expect(screen.getByText('Test error')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.queryByText('Test error')).not.toBeInTheDocument()
  })

  it('removes toast messages after clicking on toast', async () => {
    jest.useRealTimers()

    renderWithTheme(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Show Error Toast'))
    expect(screen.getByText('Test error')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Test error'))

    expect(screen.queryByText('Test error')).not.toBeInTheDocument()
  })

  it('shows waning message when specified', async () => {
    jest.useRealTimers()

    renderWithTheme(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Show Warning Toast'))
    expect(screen.getByText('Test warning')).toBeInTheDocument()
    expect(screen.queryByText('Test error')).not.toBeInTheDocument()
  })
})
