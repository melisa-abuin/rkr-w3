import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch from '..'

describe('Switch', () => {
  const mockOnChange = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders unchecked by default', () => {
    render(
      <Switch checked={false} id="test" name="test" onChange={mockOnChange} />,
    )

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders checked when checked prop is true', () => {
    render(<Switch checked id="test" name="test" onChange={mockOnChange} />)

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange when toggled', async () => {
    render(
      <Switch checked={false} id="test" name="test" onChange={mockOnChange} />,
    )

    await userEvent.click(screen.getByRole('checkbox'))

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('renders the label when provided', () => {
    render(
      <Switch
        checked={false}
        id="test"
        label="is active"
        name="test"
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByText('is active')).toBeInTheDocument()
  })

  it('associates the label with the checkbox', () => {
    render(
      <Switch
        checked={false}
        id="test"
        label="is active"
        name="test"
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByLabelText('is active')).toBeInTheDocument()
  })

  it('does not render a label element when label prop is omitted', () => {
    render(
      <Switch checked={false} id="test" name="test" onChange={mockOnChange} />,
    )

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })
})
