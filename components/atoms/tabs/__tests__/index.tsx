import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tabs from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Tabs component', () => {
  const titles = ['Tab 1', 'Tab 2', 'Tab 3']

  const setup = () =>
    renderWithTheme(
      <Tabs titles={titles}>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
      </Tabs>,
    )

  it('renders all tab titles', () => {
    setup()
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('renders the content of the first tab by default', () => {
    setup()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('changes content when a tab is clicked', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('Tab 2'))
    expect(screen.getByText('Content 2')).toBeInTheDocument()

    await user.click(screen.getByText('Tab 3'))
    expect(screen.getByText('Content 3')).toBeInTheDocument()
  })

  it('only shows one tab content at a time', () => {
    setup()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
  })
})
