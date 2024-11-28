import { screen } from '@testing-library/react'
import Info from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Info', () => {
  it('renders the correct child', () => {
    renderWithTheme(<Info>Hello</Info>)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
