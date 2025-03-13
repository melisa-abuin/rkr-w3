import React from 'react'
import { screen } from '@testing-library/react'
import Challenges from '@/components/molecules/table/components/tableData/challenges'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Challenges', () => {
  it('renders with Winner icon when general challenges are fully completed', () => {
    renderWithTheme(
      <Challenges challenges={{ general: [56, 56], tournament: [10, 10] }} />,
    )
    const element = screen.getByText('56/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(1, 197, 219)')
  })

  it('renders with Flame icon when 75% or more general challenges are completed', () => {
    renderWithTheme(
      <Challenges challenges={{ general: [42, 56], tournament: [5, 10] }} />,
    )
    const element = screen.getByText('42/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(0, 64, 255)')
  })

  it('renders without icon but with yellow color when 50% or more general challenges are completed', () => {
    renderWithTheme(
      <Challenges challenges={{ general: [30, 56], tournament: [5, 10] }} />,
    )
    const element = screen.getByText('30/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(255, 108, 0)')
  })

  it('renders without icon and with primary text color when less than 50% general challenges are completed', () => {
    renderWithTheme(
      <Challenges challenges={{ general: [20, 56], tournament: [2, 10] }} />,
    )
    const element = screen.getByText('20/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(5, 5, 5)')
  })

  it('renders a "none" message when no general challenges are done', () => {
    renderWithTheme(
      <Challenges challenges={{ general: [0, 0], tournament: [0, 10] }} />,
    )
    const element = screen.getByText('none')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(5, 5, 5)')
  })
})
