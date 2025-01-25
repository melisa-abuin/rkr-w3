import React from 'react'
import { screen } from '@testing-library/react'
import Tooltip from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Tooltip', () => {
  const defaultProps = {
    title: 'Tooltip Title',
    description: 'This is a tooltip description.',
  }

  it('renders the children content', () => {
    renderWithTheme(
      <Tooltip {...defaultProps}>
        <button>Hover me</button>
      </Tooltip>,
    )
    const childElement = screen.getByRole('button', { name: 'Hover me' })
    expect(childElement).toBeInTheDocument()
  })

  it('renders the tooltip with title and description', () => {
    renderWithTheme(<Tooltip {...defaultProps} />)

    const tooltipTitle = screen.getByText('Tooltip Title')
    const tooltipDescription = screen.getByText(
      'This is a tooltip description.',
    )

    expect(tooltipTitle).toBeInTheDocument()
    expect(tooltipDescription).toBeInTheDocument()
  })

  it('includes the appropriate accessibility roles and attributes', () => {
    renderWithTheme(<Tooltip {...defaultProps} />)

    const tooltipContainer = screen.getByLabelText('Award details')
    const tooltip = screen.getByRole('tooltip')

    expect(tooltipContainer).toBeInTheDocument()
    expect(tooltip).toBeInTheDocument()
  })

  it('handles the absence of children gracefully', () => {
    renderWithTheme(<Tooltip {...defaultProps} />)

    const tooltipTitle = screen.getByText('Tooltip Title')
    const tooltipDescription = screen.getByText(
      'This is a tooltip description.',
    )

    expect(tooltipTitle).toBeInTheDocument()
    expect(tooltipDescription).toBeInTheDocument()
  })
})
