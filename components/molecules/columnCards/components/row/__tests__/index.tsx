import { mockPlayers } from '@/mocks/data/playerStats'
import { render, screen } from '@testing-library/react'
import Row from '..'

const player = mockPlayers[0].battleTag
const bestTime = mockPlayers[0].roundOne.best

describe('Row', () => {
  it('renders empty cells if player or data is missing', () => {
    render(
      <table>
        <tbody>
          <Row hoverable={true} />
        </tbody>
      </table>,
    )
    expect(screen.getAllByText('--')).toHaveLength(2)
  })

  it('renders player name and formatted time when data is BestTime', () => {
    render(
      <table>
        <tbody>
          <Row data={bestTime} hoverable={true} player={player} />
        </tbody>
      </table>,
    )

    expect(screen.getByText('Pablo')).toBeInTheDocument()
    expect(screen.getByText('03:20')).toBeInTheDocument()
    expect(screen.getByText('normal')).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    links.forEach((link) =>
      expect(link).toHaveAttribute('href', '/player/Pablo%231234'),
    )
  })

  it('renders player name and plain number when data is a number', () => {
    render(
      <table>
        <tbody>
          <Row data={999} hoverable={false} player={player} />
        </tbody>
      </table>,
    )

    expect(screen.getByText('Pablo')).toBeInTheDocument()
    expect(screen.getByText('999')).toBeInTheDocument()
  })

  it('does not apply hoverable styling if hoverable is false or data is not BestTime', () => {
    const { container } = render(
      <table>
        <tbody>
          <Row data={999} hoverable={false} player={player} />
        </tbody>
      </table>,
    )
    const tr = container.querySelector('tr')
    expect(tr).not.toHaveAttribute('hoverable')
  })
})
