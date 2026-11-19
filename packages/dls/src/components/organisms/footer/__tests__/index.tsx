import { fireEvent, render, screen } from '@testing-library/react'
import Footer from '..'
import { blizzardLink, githubReadMeLink } from '@/constants'
import { QueryProvider } from '@/hooks/useQuery'
import { ToastProvider } from '@/hooks/useToast'

const renderFooter = () =>
  render(
    <QueryProvider>
      <ToastProvider>
        <Footer />
      </ToastProvider>
    </QueryProvider>,
  )

describe('Footer', () => {
  it('renders the column titles', () => {
    renderFooter()

    ;['Community', 'Open source'].forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    })
  })

  it('contains correct Blizzard link', () => {
    renderFooter()

    const blizzardAnchor = screen.getByText('Blizzard Entertainment')
    expect(blizzardAnchor).toBeInTheDocument()
    expect(blizzardAnchor).toHaveAttribute('href', blizzardLink)
  })

  it('opens and closes the feedback modal', () => {
    renderFooter()

    expect(screen.queryByText('Leave us a review')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Feedback' }))
    expect(screen.getByText('Leave us a review')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(screen.queryByText('Leave us a review')).not.toBeInTheDocument()
  })

  it('contains correct GitHub link', () => {
    renderFooter()

    const githubAnchor = screen.getByText('Contribute to the website')
    expect(githubAnchor).toBeInTheDocument()
    expect(githubAnchor).toHaveAttribute('href', githubReadMeLink)
  })
})
