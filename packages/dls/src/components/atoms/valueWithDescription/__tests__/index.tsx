import { render, screen } from '@testing-library/react'
import ValueWithDescription from '..'

describe('ValueWithDescription', () => {
  it('renders the value and description', () => {
    render(<ValueWithDescription description="Total Time" value="1:23" />)

    expect(screen.getByText('1:23')).toBeInTheDocument()
    expect(screen.getByText('Total Time')).toBeInTheDocument()
  })

  it('renders a numeric value', () => {
    render(<ValueWithDescription description="Score" value={42} />)

    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders 0 when value is falsy', () => {
    render(<ValueWithDescription description="Score" value={0} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('does not apply hidden class by default', () => {
    const { container } = render(
      <ValueWithDescription description="Score" value={1} />,
    )

    expect(container.firstChild).not.toHaveClass('containerHiddenOnMobile')
  })

  it('applies hidden class when hideOnMobile is true', () => {
    const { container } = render(
      <ValueWithDescription description="Score" hideOnMobile value={1} />,
    )

    expect(container.firstChild).toHaveClass('containerHiddenOnMobile')
  })
})
