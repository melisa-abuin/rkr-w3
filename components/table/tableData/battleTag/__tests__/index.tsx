import React from 'react'
import { screen } from '@testing-library/react'
import BattleTag from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('BattleTag', () => {
  it('renders battletag and displays correct title and subtitle', () => {
    const completeBattleTag = 'Alex#76923'
    const battletag = 'Alex'

    renderWithTheme(
      <BattleTag battleTag={{ name: battletag, tag: completeBattleTag }} />,
    )

    const titleElement = screen.getByText('Alex')
    const subTitleElement = screen.getByText('Alex#76923')

    expect(titleElement).toBeInTheDocument()
    expect(subTitleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('Alex')
    expect(subTitleElement).toHaveTextContent(battletag)
  })
})
