import React from 'react'
import { screen } from '@testing-library/react'
import Challenges from '@/components/table/tableData/challenges'
import { renderWithTheme } from '@/utils/renderWithTheme'

function mockMatchMedia(matches: boolean) {
  return jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
}

describe('Challenges', () => {
  beforeEach(() => {
    window.matchMedia = mockMatchMedia(false)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders with Winner icon when challenges are fully completed', () => {
    renderWithTheme(<Challenges challenges={[56, 56]} />)
    const element = screen.getByText('56/56')
    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(1, 197, 219)')
  })

  it('renders with Flame icon when 75% or more challenges are completed', () => {
    renderWithTheme(<Challenges challenges={[42, 56]} />)
    const element = screen.getByText('42/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(0, 195, 62)')
  })

  it('renders without icon but with yellow color when 50% or more challenges are completed', () => {
    renderWithTheme(<Challenges challenges={[30, 56]} />)
    const element = screen.getByText('30/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(217, 154, 5)')
  })

  it('renders without icon and with primary text color when less than 50% challenges are completed', () => {
    renderWithTheme(<Challenges challenges={[20, 56]} />)
    const element = screen.getByText('20/56')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(5, 5, 5)')
  })

  it('renders a "none" message when no challeges are done', () => {
    renderWithTheme(<Challenges challenges={[0, 0]} />)
    const element = screen.getByText('none')

    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('color: rgb(5, 5, 5)')
  })
})
