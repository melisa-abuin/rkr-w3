import { mockPlayers as formattedMockData } from '@/mocks/data/playerStats'
import { formatComparePlayer } from '..'

describe('formatComparePlayer', () => {
  const [player0, player1] = formattedMockData

  const savesColumn = [{ title: 'Saves', key: 'saves' }] as const
  const roundOneColumn = [{ title: 'Round One', key: 'roundOne' }] as const
  const roundFiveColumn = [{ title: 'Round Five', key: 'roundFive' }] as const

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('formats data correctly', () => {
    const result = formatComparePlayer(
      { ...player0 },
      { ...player1 },
      savesColumn,
      undefined,
    )
    expect(result).toHaveLength(2)
  })

  it('matches the expected shape when comparing two players', () => {
    const result = formatComparePlayer(
      { ...player0 },
      { ...player1 },
      savesColumn,
      undefined,
    )

    expect(result).toStrictEqual([
      {
        title: player0.battleTag.name,
        columns: [
          {
            description: 'Saves',
            highlight: true,
            value: player0.saves,
          },
        ],
      },
      {
        title: player1.battleTag.name,
        columns: [
          {
            description: 'Saves',
            highlight: false,
            value: player1.saves,
          },
        ],
      },
    ])
  })

  it('matches the expected shape when there`s only one player', () => {
    const result = formatComparePlayer(
      { ...player0 },
      undefined,
      savesColumn,
      undefined,
    )
    expect(result).toStrictEqual([
      {
        title: '',
        columns: [
          {
            description: 'Saves',
            highlight: false,
            value: player0.saves,
          },
        ],
      },
    ])
  })

  it('highlights the fastest time', () => {
    const result = formatComparePlayer(
      { ...player0 },
      { ...player1 },
      roundOneColumn,
      undefined,
    )

    expect(result).toStrictEqual([
      {
        title: player0.battleTag.name,
        columns: [
          {
            description: 'Round One',
            highlight: false,
            value: '03:20',
          },
        ],
      },
      {
        title: player1.battleTag.name,
        columns: [
          {
            description: 'Round One',
            highlight: true,
            value: '03:10',
          },
        ],
      },
    ])
  })

  it('highlights the fastest time when difficulty is passed as param', () => {
    const result = formatComparePlayer(
      { ...player0 },
      { ...player1 },
      roundFiveColumn,
      'hard',
    )

    expect(result).toStrictEqual([
      {
        title: player0.battleTag.name,
        columns: [
          {
            description: 'Round Five',
            highlight: false,
            value: '08:40',
          },
        ],
      },
      {
        title: player1.battleTag.name,
        columns: [
          {
            description: 'Round Five',
            highlight: true,
            value: '08:30',
          },
        ],
      },
    ])
  })

  it('filters out unavailable rounds for progressive difficulty', () => {
    const allColumns = [
      { title: 'Round One', key: 'roundOne' },
      { title: 'Round Four', key: 'roundFour' },
      { title: 'Round Five', key: 'roundFive' },
      { title: 'Saves', key: 'saves' },
    ] as const

    const result = formatComparePlayer(
      { ...player0 },
      { ...player1 },
      allColumns,
      'progressive',
    )

    expect(result).toHaveLength(2)
    expect(result[0].columns).toHaveLength(2)
    expect(result[1].columns).toHaveLength(2)
    expect(result[0].columns.map((column) => column.description)).toStrictEqual(
      ['Round One', 'Saves'],
    )
    expect(result[1].columns.map((column) => column.description)).toStrictEqual(
      ['Round One', 'Saves'],
    )
  })
})
