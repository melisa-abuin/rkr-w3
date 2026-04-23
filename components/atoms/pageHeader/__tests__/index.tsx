import { render, screen } from '@testing-library/react'
import PageHeader from '..'

describe('PageHeader', () => {
  it('renders the title', () => {
    render(<PageHeader description="Some description" title="How to play" />)

    expect(screen.getByText('How to play')).toBeInTheDocument()
    expect(screen.getByText('Some description')).toBeInTheDocument()
  })
  it('adds the correct align based on props', () => {
    const { container } = render(
      <PageHeader
        align="flex-start"
        description="Some description"
        title="How to play"
      />,
    )

    expect(container.firstChild).toHaveClass('headerStart')
  })
})
