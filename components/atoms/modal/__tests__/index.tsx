import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Modal Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = renderWithTheme(
      <Modal isOpen={false} onClose={jest.fn()}>
        Modal Content
      </Modal>,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders when isOpen is true', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={jest.fn()}>
        Modal Content
      </Modal>,
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Title">
        Modal Content
      </Modal>,
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn()
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        Modal Content
      </Modal>,
    )

    const closeButton = screen.getByLabelText('Close modal')
    await userEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
