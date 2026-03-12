import React from 'react'
import { render, screen } from '@testing-library/react'
import PlayersList from '..'

describe('PlayersList', () => {
  it('renders the player names without battle tags', () => {
    render(
      <PlayersList data="PlayerOne#1234, PlayerTwo#5678, PlayerThree#9999" />,
    )
    expect(
      screen.getByText('PlayerOne, PlayerTwo, PlayerThree'),
    ).toBeInTheDocument()
  })

  it('renders as-is if there are no battle tags', () => {
    render(<PlayersList data="Alice, Bob, Charlie" />)
    expect(screen.getByText('Alice, Bob, Charlie')).toBeInTheDocument()
  })

  it('removes mixed #numbers in player strings', () => {
    render(<PlayersList data="Test#123, Dev#456, QA#999" />)
    expect(screen.getByText('Test, Dev, QA')).toBeInTheDocument()
  })
})
