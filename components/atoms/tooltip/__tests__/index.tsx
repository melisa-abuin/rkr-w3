import React from 'react'
import { screen } from '@testing-library/react'
import Tooltip from '..'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Tooltip', () => {
  const tooltipText = 'This is a tooltip'
  const ariaLabel = 'Custom Tooltip Label'

  it('renders children correctly', () => {
    renderWithTheme(
      <Tooltip body={tooltipText}>
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('applies custom aria-label if provided', () => {
    renderWithTheme(
      <Tooltip body={tooltipText} ariaLabel={ariaLabel}>
        <div>Hover</div>
      </Tooltip>,
    )
    expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument()
  })

  it('applies default aria-label if none is provided', () => {
    renderWithTheme(
      <Tooltip body={tooltipText}>
        <div>Hover</div>
      </Tooltip>,
    )
    expect(screen.getByLabelText('Tooltip')).toBeInTheDocument()
  })

  it('shows the tooltip on mouse enter', async () => {
    renderWithTheme(
      <Tooltip body={tooltipText}>
        <div>Hover here</div>
      </Tooltip>,
    )

    await userEvent.hover(screen.getByText('Hover here'))
    expect(screen.getByRole('tooltip')).toHaveTextContent(tooltipText)
  })

  it('hides the tooltip on mouse leave', async () => {
    renderWithTheme(
      <Tooltip body={tooltipText}>
        <div>Hover here</div>
      </Tooltip>,
    )

    const trigger = screen.getByText('Hover here')
    await userEvent.hover(trigger)
    expect(screen.getByRole('tooltip')).toBeVisible()

    await userEvent.unhover(trigger)
    expect(screen.getByRole('tooltip')).not.toBeVisible()
  })
})
