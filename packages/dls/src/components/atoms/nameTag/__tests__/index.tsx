import { render, screen } from '@testing-library/react'
import NameTag from '..'

describe('NameTag', () => {
  it('renders children and subtitle', () => {
    render(<NameTag subtitle="Alex#1234">Alex</NameTag>)

    expect(screen.getByText('Alex')).toBeInTheDocument()
    expect(screen.getByText('Alex#1234')).toBeInTheDocument()
  })

  it('applies alignLeft class by default', () => {
    const { container } = render(<NameTag subtitle="sub">Name</NameTag>)

    expect(container.firstChild).toHaveClass('alignLeft')
  })

  it('applies the correct alignment class when textAlign is provided', () => {
    const { container } = render(
      <NameTag subtitle="sub" textAlign="center">
        Name
      </NameTag>,
    )

    expect(container.firstChild).toHaveClass('alignCenter')
    expect(container.firstChild).not.toHaveClass('alignLeft')
  })
})
