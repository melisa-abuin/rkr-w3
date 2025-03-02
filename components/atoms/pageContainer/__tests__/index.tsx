import { screen } from '@testing-library/react'
import { PageContainer } from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('PageContainer', () => {
  it('renders children correctly', () => {
    const childText = 'Test Content'
    renderWithTheme(
      <PageContainer ariaLabelledby="some title">
        <div>{childText}</div>
      </PageContainer>,
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
