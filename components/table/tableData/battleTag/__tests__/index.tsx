import React from 'react'
import { screen } from '@testing-library/react'
import BattleTag from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('BattleTag', () => {
  it('renders battletag and displays correct title and subtitle', () => {
    const battletag = 'Alex'

    renderWithTheme(<BattleTag battletag={battletag} />)

    const titleElement = screen.getByText(battletag)

    expect(titleElement).toBeInTheDocument()
  })
})
