import { screen } from '@testing-library/react'
import { PageContainer } from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('PageContainer', () => {
  it('renders children correctly', () => {
    const childText = 'Test Content'
    renderWithTheme(
      <PageContainer ariaLabelledby="some-title">
        <div>{childText}</div>
      </PageContainer>,
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })

  it('renders a title when provided', () => {
    renderWithTheme(
      <PageContainer title="Test Title" ariaLabelledby="test-title-id">
        <p>Some child</p>
      </PageContainer>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /test title/i }),
    ).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    renderWithTheme(
      <PageContainer>
        <span>No title here</span>
      </PageContainer>,
    )

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('applies correct alignment to title', () => {
    renderWithTheme(
      <PageContainer
        title="Aligned Title"
        align="center"
        ariaLabelledby="aligned-id"
      >
        <span>Child</span>
      </PageContainer>,
    )

    const title = screen.getByText('Aligned Title')
    expect(title).toHaveAttribute('id', 'aligned-id')
    expect(title).toHaveStyle({ textAlign: 'center' })
  })

  it('renders with different HTML element using "as" prop', () => {
    const { container } = renderWithTheme(
      <PageContainer as="div" ariaLabelledby="div-test">
        <div>Some content</div>
      </PageContainer>,
    )

    const outer = container.querySelector('[aria-labelledby="div-test"]')
    expect(outer?.tagName).toBe('DIV')
  })
})
