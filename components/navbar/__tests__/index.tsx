import { screen } from '@testing-library/react'
import Navbar from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

function mockMatchMedia(matches: boolean) {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
}

describe('Navbar', () => {
  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the logo and navigation links', () => {
    renderWithTheme(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('How To Play')).toBeInTheDocument()
  })
})
