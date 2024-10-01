import { screen } from '@testing-library/react'
import PageHeader from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('PageHeader', () => {
  it('renders the logo and navigation links', () => {
    renderWithTheme(<PageHeader />)

    expect(screen.getByText('How to play')).toBeInTheDocument()
  })
})
