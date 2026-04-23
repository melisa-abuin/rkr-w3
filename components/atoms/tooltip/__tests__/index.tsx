import React from 'react'
import { render, screen } from '@testing-library/react'
import Tooltip from '..'
import userEvent from '@testing-library/user-event'

describe('Tooltip', () => {
  const tooltipText = 'This is a tooltip'
  const ariaLabel = 'Custom Tooltip Label'

  it('renders children correctly', () => {
    render(
      <Tooltip body={tooltipText}>
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('applies custom aria-label if provided', () => {
    render(
      <Tooltip ariaLabel={ariaLabel} body={tooltipText}>
        <div>Hover</div>
      </Tooltip>,
    )
    expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument()
  })

  it('applies default aria-label if none is provided', () => {
    render(
      <Tooltip body={tooltipText}>
        <div>Hover</div>
      </Tooltip>,
    )
    expect(screen.getByLabelText('Tooltip')).toBeInTheDocument()
  })

  it('shows the tooltip on mouse enter', async () => {
    render(
      <Tooltip body={tooltipText}>
        <div>Hover here</div>
      </Tooltip>,
    )

    await userEvent.hover(screen.getByText('Hover here'))
    expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipText)
  })

  it('hides the tooltip on mouse leave', async () => {
    render(
      <Tooltip body={tooltipText}>
        <div>Hover here</div>
      </Tooltip>,
    )

    const trigger = screen.getByText('Hover here')
    await userEvent.hover(trigger)
    expect(screen.getByRole('tooltip')).toHaveClass('tooltipVisible')

    await userEvent.unhover(trigger)
    expect(screen.getByRole('tooltip')).not.toHaveClass('tooltipVisible')
  })
})
