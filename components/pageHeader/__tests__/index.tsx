import { screen } from '@testing-library/react'
import PageHeader from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('PageHeader', () => {
  it('renders the title', () => {
    renderWithTheme(
      <PageHeader title="How to play" description="Some description" />,
    )

    expect(screen.getByText('How to play')).toBeInTheDocument()
    expect(screen.getByText('Some description')).toBeInTheDocument()
  })
  it('adds the correctr align based on props', () => {
    const { container } = renderWithTheme(
      <PageHeader
        title="How to play"
        description="Some description"
        align="flex-start"
      />,
    )

    expect(container.firstChild).toHaveStyle('align-items: flex-start')
  })
})
