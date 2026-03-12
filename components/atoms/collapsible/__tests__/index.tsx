import { screen, fireEvent } from '@testing-library/react'
import Collapsible from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Collapsible', () => {
  it('renders the title by default with the content hidden', () => {
    renderWithTheme(
      <Collapsible title="Test Title">Hidden Content</Collapsible>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()

    const body = screen.getByText('Hidden Content')
    expect(body).toHaveAttribute('aria-hidden', 'true')
  })

  it('toggles content on header click', () => {
    renderWithTheme(<Collapsible title="Click Me">Toggled Content</Collapsible>)

    const header = screen.getByText('Click Me')
    fireEvent.click(header)

    const content = screen.getByText('Toggled Content')
    expect(content).toHaveAttribute('aria-hidden', 'false')

    fireEvent.click(header)
    expect(content).toHaveAttribute('aria-hidden', 'true')
  })
})
