import { screen } from '@testing-library/react'
import Row from '..'
import { BestTime } from '@/interfaces/player'
import { BattleTag } from '@/interfaces/player'
import { renderWithTheme } from '@/utils/renderWithTheme'

const player: BattleTag = {
  name: 'PlayerOne',
  tag: 'player#1234',
}

const bestTime: BestTime = {
  time: 150,
  difficulty: 'normal',
}

describe('Row', () => {
  it('renders empty cells if player or data is missing', () => {
    renderWithTheme(<Row hoverable={true} />)
    expect(screen.getAllByText('--')).toHaveLength(2)
  })

  it('renders player name and formatted time when data is BestTime', () => {
    renderWithTheme(<Row player={player} data={bestTime} hoverable={true} />)

    expect(screen.getByText('PlayerOne')).toBeInTheDocument()
    expect(screen.getByText('02:30')).toBeInTheDocument()
    expect(screen.getByText('normal')).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    links.forEach((link) =>
      expect(link).toHaveAttribute('href', '/player/player%231234'),
    )
  })

  it('renders player name and plain number when data is a number', () => {
    renderWithTheme(<Row player={player} data={999} hoverable={false} />)

    expect(screen.getByText('PlayerOne')).toBeInTheDocument()
    expect(screen.getByText('999')).toBeInTheDocument()
  })

  it('does not apply hoverable styling if hoverable is false or data is not BestTime', () => {
    const { container } = renderWithTheme(
      <Row player={player} data={999} hoverable={false} />,
    )
    const tr = container.querySelector('tr')
    expect(tr).not.toHaveAttribute('hoverable')
  })
})
