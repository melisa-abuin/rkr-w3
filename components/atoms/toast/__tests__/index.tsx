import { screen, fireEvent } from '@testing-library/react'
import Toast from '..'
import { ToastVariant } from '@/interfaces/toast'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Toast', () => {
  const mockOnClick = jest.fn()
  const defaultProps = {
    index: 0,
    message: 'Test message',
    onClick: mockOnClick,
    variant: 'error' as ToastVariant,
  }

  it('renders the toast message correctly', () => {
    renderWithTheme(<Toast {...defaultProps} />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('calls onClick when the toast is clicked', () => {
    renderWithTheme(<Toast {...defaultProps} />)
    fireEvent.click(screen.getByText('Test message'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
