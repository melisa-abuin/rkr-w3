import { render, screen, fireEvent, act } from '@testing-library/react'
import { ToastProvider, useToast } from '..'
import userEvent from '@testing-library/user-event'

const TestComponent = () => {
  const { showToast } = useToast()

  return (
    <div>
      <button onClick={() => showToast('Test message', 'success', 2000)}>
        Show Success Toast
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

  it('renders children correctly', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    expect(screen.getByText('Show Success Toast')).toBeInTheDocument()
  })

  it('removes toast messages after duration', () => {
    render(
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

    render(
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
