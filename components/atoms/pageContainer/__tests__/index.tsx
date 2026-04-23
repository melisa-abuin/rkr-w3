import { render, screen } from '@testing-library/react'
import { PageContainer } from '..'

describe('PageContainer', () => {
  it('renders children correctly', () => {
    const childText = 'Test Content'
    render(
      <PageContainer ariaLabelledby="some-title">
        <div>{childText}</div>
      </PageContainer>,
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })

  it('renders a title when provided', () => {
    render(
      <PageContainer ariaLabelledby="test-title-id" title="Test Title">
        <p>Some child</p>
      </PageContainer>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /test title/i }),
    ).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    render(
      <PageContainer>
        <span>No title here</span>
      </PageContainer>,
    )

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('applies correct alignment to title', () => {
    render(
      <PageContainer
        align="center"
        ariaLabelledby="aligned-id"
        title="Aligned Title"
      >
        <span>Child</span>
      </PageContainer>,
    )

    const title = screen.getByText('Aligned Title')
    expect(title).toHaveAttribute('id', 'aligned-id')
    expect(title).toHaveClass('titleCenter')
  })

  it('renders with different HTML element using "as" prop', () => {
    const { container } = render(
      <PageContainer ariaLabelledby="div-test" as="div">
        <div>Some content</div>
      </PageContainer>,
    )

    const outer = container.querySelector('[aria-labelledby="div-test"]')
    expect(outer?.tagName).toBe('DIV')
  })
})
