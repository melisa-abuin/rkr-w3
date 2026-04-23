import { render, screen } from '@testing-library/react'
import Link from '..'

describe('Link', () => {
  it('renders children and href correctly', () => {
    const childText = 'Test Content'
    render(<Link href="/">{childText}</Link>)

    expect(screen.getByText(childText)).toBeInTheDocument()
    expect(screen.getByText(childText)).toHaveAttribute('href', '/')
  })
})
