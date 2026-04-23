import React from 'react'
import { render, screen } from '@testing-library/react'
import PlayerTag from '..'

describe('PlayerTag', () => {
  it('renders battletag and displays correct title and subtitle', () => {
    const completeBattleTag = 'Alex#76923'
    const battletag = 'Alex'

    render(
      <PlayerTag battleTag={{ name: battletag, tag: completeBattleTag }} />,
    )

    const titleElement = screen.getByText('Alex')
    const subTitleElement = screen.getByText('Alex#76923')

    expect(titleElement).toBeInTheDocument()
    expect(subTitleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('Alex')
    expect(subTitleElement).toHaveTextContent(battletag)
  })

  it('displays the correct link', () => {
    const completeBattleTag = 'Alex#76923'
    const battletag = 'Alex'

    render(
      <PlayerTag battleTag={{ name: battletag, tag: completeBattleTag }} />,
    )

    const link = screen.getByText('Alex')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/player/Alex%2376923')
  })
})
