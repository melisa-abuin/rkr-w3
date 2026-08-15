import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Announcement from '..'

describe('Announcement', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows when not previously dismissed', () => {
    render(<Announcement subtitle="Test Subtitle" title="Test Title" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('does not show when previously dismissed', () => {
    const title = 'Test Title'
    localStorage.setItem(`announcement-${title.substring(0, 40)}`, 'dismissed')

    render(<Announcement subtitle="Test Subtitle" title={title} />)

    expect(screen.queryByText(title)).not.toBeInTheDocument()
  })

  it('shows the subtitle when provided', () => {
    render(<Announcement subtitle="Test Subtitle" title="Test Title" />)

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('hides the subtitle section when subtitle is empty', () => {
    render(<Announcement subtitle="" title="Test Title" />)

    expect(screen.queryByRole('emphasis')).not.toBeInTheDocument()
  })

  it('dismisses when the close button is clicked', async () => {
    render(<Announcement subtitle="Test Subtitle" title="Test Title" />)

    await userEvent.click(
      screen.getByRole('button', { name: 'Close announcement' }),
    )

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })

  it('stores dismissal in localStorage when closed', async () => {
    const title = 'Test Title'
    const storageKey = `announcement-${title.substring(0, 40)}`

    render(<Announcement subtitle="Test Subtitle" title={title} />)

    await userEvent.click(
      screen.getByRole('button', { name: 'Close announcement' }),
    )

    expect(localStorage.getItem(storageKey)).toBe('dismissed')
  })
})
