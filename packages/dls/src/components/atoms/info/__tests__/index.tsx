import { render, screen } from '@testing-library/react'
import Info from '..'

describe('Info', () => {
  it('renders the correct child', () => {
    render(<Info>Hello</Info>)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
