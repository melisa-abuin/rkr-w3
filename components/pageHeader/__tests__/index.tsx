import { screen } from '@testing-library/react'
import PageHeader from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('PageHeader', () => {
  it('renders the title', () => {
    renderWithTheme(<PageHeader />)

    expect(screen.getByText('How to play')).toBeInTheDocument()
  })
})
