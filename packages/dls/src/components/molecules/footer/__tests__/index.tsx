import { render, screen } from '@testing-library/react'
import Footer from '..'
import { blizzardLink, githubReadMeLink } from '@/constants'

describe('Footer', () => {
  it('renders the column titles', () => {
    render(<Footer />)

    ;['Community', 'Open source'].forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    })
  })

  it('contains correct Blizzard link', () => {
    render(<Footer />)

    const blizzardAnchor = screen.getByText('Blizzard Entertainment')
    expect(blizzardAnchor).toBeInTheDocument()
    expect(blizzardAnchor).toHaveAttribute('href', blizzardLink)
  })

  it('contains correct GitHub link', () => {
    render(<Footer />)

    const githubAnchor = screen.getByText('Contribute to the website')
    expect(githubAnchor).toBeInTheDocument()
    expect(githubAnchor).toHaveAttribute('href', githubReadMeLink)
  })
})
