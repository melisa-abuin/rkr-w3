import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '..'

describe('Modal Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        Modal Content
      </Modal>,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        Modal Content
      </Modal>,
    )
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Modal isOpen={true} title="Test Title" onClose={jest.fn()}>
        Modal Content
      </Modal>,
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        Modal Content
      </Modal>,
    )

    const closeButton = screen.getByLabelText('Close modal')
    await userEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
