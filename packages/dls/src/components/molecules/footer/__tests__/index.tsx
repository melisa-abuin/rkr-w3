import { render, screen } from '@testing-library/react'
import Footer from '..'
import { blizzardLink, githubReadMeLink } from '@/constants'

describe('Footer', () => {
  it('renders footer text correctly', () => {
    render(<Footer />)

    expect(
      screen.getByText(
        'This is a non-profit project developed and maintained by Aches',
      ),
    ).toBeInTheDocument()
  })

  it('contains correct Blizzard link', () => {
    render(<Footer />)

    const blizzardAnchor = screen.getByText('Blizzard Entertainment')
    expect(blizzardAnchor).toBeInTheDocument()
    expect(blizzardAnchor).toHaveAttribute('href', blizzardLink)
  })

  it('contains correct GitHub link', () => {
    render(<Footer />)

    const githubAnchor = screen.getByText('how to contribute')
    expect(githubAnchor).toBeInTheDocument()
    expect(githubAnchor).toHaveAttribute('href', githubReadMeLink)
  })
})
