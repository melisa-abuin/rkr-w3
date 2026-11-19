import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryProvider } from '@/hooks/useQuery'
import { ToastProvider } from '@/hooks/useToast'
import FeedbackModal from '..'

const renderModal = (onClose = vi.fn()) => {
  render(
    <QueryProvider>
      <ToastProvider>
        <FeedbackModal isOpen onClose={onClose} />
      </ToastProvider>
    </QueryProvider>,
  )
  return onClose
}

const fillForm = async () => {
  await userEvent.click(screen.getByRole('button', { name: /Feedback/ }))
  await userEvent.click(screen.getByRole('option', { name: 'Bug report' }))
  await userEvent.type(screen.getByLabelText('Title'), 'Broken page')
  await userEvent.type(screen.getByLabelText('Description'), 'It crashes')
}

describe('FeedbackModal', () => {
  it('disables submit until title and description are filled', async () => {
    renderModal()

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()

    await userEvent.type(screen.getByLabelText('Title'), 'Broken page')
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()

    await userEvent.type(screen.getByLabelText('Description'), 'It crashes')
    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled()
  })

  it('posts the feedback and closes on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true })
    const onClose = renderModal()

    await fillForm()
    expect(screen.getByLabelText('Your name')).toHaveValue('Anonymous')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
    expect(fetch).toHaveBeenCalledWith('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: 'It crashes',
        name: 'Anonymous',
        title: 'Broken page',
        type: 'bug-report',
      }),
    })
    expect(screen.getByText('Thanks for your feedback!')).toBeInTheDocument()
  })

  it('shows an error toast and stays open on failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    const onClose = renderModal()

    await fillForm()
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(
      await screen.findByText(/Could not send your feedback/),
    ).toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })
})
