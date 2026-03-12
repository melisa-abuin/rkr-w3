import { screen } from '@testing-library/react'
import PageHeader from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('PageHeader', () => {
  it('renders the title', () => {
    renderWithTheme(
      <PageHeader description="Some description" title="How to play" />,
    )

    expect(screen.getByText('How to play')).toBeInTheDocument()
    expect(screen.getByText('Some description')).toBeInTheDocument()
  })
  it('adds the correctr align based on props', () => {
    const { container } = renderWithTheme(
      <PageHeader
        align="flex-start"
        description="Some description"
        title="How to play"
      />,
    )

    expect(container.firstChild).toHaveStyle('align-items: flex-start')
  })
})
