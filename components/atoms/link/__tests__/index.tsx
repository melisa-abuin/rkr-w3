import { screen } from '@testing-library/react'
import Link from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Link', () => {
  it('renders children and href correctly', () => {
    const childText = 'Test Content'
    renderWithTheme(<Link href="/">{childText}</Link>)

    expect(screen.getByText(childText)).toBeInTheDocument()
    expect(screen.getByText(childText)).toHaveAttribute('href', '/')
  })
})
