import React from 'react'
import { render, screen } from '@testing-library/react'
import DatePlayed from '..'

describe('DatePlayed component', () => {
  it('renders formatted date difference', () => {
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)

    render(<DatePlayed data={oneDayAgo.toISOString()} />)
    expect(screen.getByText('1 day ago')).toBeInTheDocument()
  })
})
