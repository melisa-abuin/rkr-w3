import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FeedbackModal from '..'

describe('FeedbackModal', () => {
  it('logs the form data and closes on submit', async () => {
    const onClose = vi.fn()
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    render(<FeedbackModal isOpen onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: /Feedback/ }))
    await userEvent.click(screen.getByRole('option', { name: 'Bug report' }))
    await userEvent.type(screen.getByLabelText('Title'), 'Broken page')
    await userEvent.type(screen.getByLabelText('Description'), 'It crashes')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(log).toHaveBeenCalledWith({
      description: 'It crashes',
      title: 'Broken page',
      type: 'bug-report',
    })
    expect(onClose).toHaveBeenCalledTimes(1)
    log.mockRestore()
  })
})
