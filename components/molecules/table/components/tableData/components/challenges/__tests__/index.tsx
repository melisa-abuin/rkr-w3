import React from 'react'
import { render, screen } from '@testing-library/react'
import Challenges from '..'

describe('Challenges', () => {
  it('renders with Winner icon when general challenges are fully completed', () => {
    render(<Challenges data={{ general: [56, 56], tournament: [10, 10] }} />)
    const element = screen.getByText('56/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('teal')
  })

  it('renders with Flame icon when 75% or more general challenges are completed', () => {
    render(<Challenges data={{ general: [42, 56], tournament: [5, 10] }} />)
    const element = screen.getByText('42/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('green')
  })

  it('renders without icon but with yellow color when 50% or more general challenges are completed', () => {
    render(<Challenges data={{ general: [30, 56], tournament: [5, 10] }} />)
    const element = screen.getByText('30/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('yellow')
  })

  it('renders without icon and with primary text color when less than 50% general challenges are completed', () => {
    render(<Challenges data={{ general: [20, 56], tournament: [2, 10] }} />)
    const element = screen.getByText('20/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('primary')
  })

  it('renders a "none" message when no general challenges are done', () => {
    render(<Challenges data={{ general: [0, 0], tournament: [0, 10] }} />)
    const element = screen.getByText('none')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('primary')
  })
})
