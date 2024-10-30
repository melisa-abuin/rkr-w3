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
})
