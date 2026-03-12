import { formatComparePlayer } from '..'
import { formattedMockData } from '@/constants'
import { Player } from '@/interfaces/player'

describe('formatComparePlayer', () => {
  const mockedPlayers: Player[] = [...formattedMockData]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('formats data correctly', () => {
    const testColumns = [{ title: 'Saves', key: 'saves' }] as const

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
      },
      {
        ...mockedPlayers[1],
      },
      testColumns,
      undefined,
    )
    expect(result).toHaveLength(2)
  })

  it('matches the expected shape when comparing two players', () => {
    const testColumns = [{ title: 'Saves', key: 'saves' }] as const

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
      },
      {
        ...mockedPlayers[1],
      },
      testColumns,
      undefined,
    )

    expect(result).toStrictEqual([
      {
        title: 'Pablo',
        columns: [
          {
            description: 'Saves',
            highlight: true,
            value: 305,
          },
        ],
      },
      {
        title: 'Gonza',
        columns: [
          {
            description: 'Saves',
            highlight: false,
            value: 280,
          },
        ],
      },
    ])
  })

  it('matches the expected shape when there`s only one player', () => {
    const testColumns = [{ title: 'Saves', key: 'saves' }] as const

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
      },
      undefined,
      testColumns,
      undefined,
    )
    expect(result).toStrictEqual([
      {
        title: '',
        columns: [
          {
            description: 'Saves',
            highlight: false,
            value: 305,
          },
        ],
      },
    ])
  })

  it('highlights the fastest time', () => {
    const testColumns = [{ title: 'Round One', key: 'roundOne' }] as const

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
      },
      {
        ...mockedPlayers[1],
      },
      testColumns,
      undefined,
    )

    expect(result).toStrictEqual([
      {
        title: 'Pablo',
        columns: [
          {
            description: 'Round One',
            highlight: false,
            value: '03:20',
          },
        ],
      },
      {
        title: 'Gonza',
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
    const testColumns = [{ title: 'Round Five', key: 'roundFive' }] as const

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
      },
      {
        ...mockedPlayers[1],
      },
      testColumns,
      'hard',
    )

    expect(result).toStrictEqual([
      {
        title: 'Pablo',
        columns: [
          {
            description: 'Round Five',
            highlight: false,
            value: '08:40',
          },
        ],
      },
      {
        title: 'Gonza',
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
    const testColumns = [
      { title: 'Round One', key: 'roundOne' },
      { title: 'Round Four', key: 'roundFour' },
      { title: 'Round Five', key: 'roundFive' },
      { title: 'Saves', key: 'saves' },
    ] as const

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
      },
      {
        ...mockedPlayers[1],
      },
      testColumns,
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
