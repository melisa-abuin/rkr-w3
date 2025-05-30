import { formatComparePlayer } from '..'
import { formattedMockData } from '@/constants'
import { PlayerStats } from '@/interfaces/player'

describe('formatComparePlayer', () => {
  const mockedPlayers: PlayerStats[] = [...formattedMockData]
  const mockDetailedData = {
    awards: [
      {
        id: 'nitros',
        awards: [
          {
            id: 'string',
            completed: true,
            description: 'string',
            imagePath: 'string',
            title: 'string',
          },
        ],
      },
    ],
    lastUploaded: '22-22-2003',
    skins: {
      selectedAura: 'none',
      selectedHat: 'none',
      selectedSkin: 'none',
      selectedTrail: 'none',
      selectedWindwalk: 'none',
      selectedWings: 'none',
    },
    mostPlayedColor: 'red' as const,
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('formats data correctly', () => {
    const testColumns = [{ title: 'Saves', key: 'saves' }] as const

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
        ...mockDetailedData,
      },
      {
        ...mockedPlayers[1],
        ...mockDetailedData,
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
        ...mockDetailedData,
      },
      {
        ...mockedPlayers[1],
        ...mockDetailedData,
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
            value: 100,
          },
        ],
      },
      {
        title: 'Gonza',
        columns: [
          {
            description: 'Saves',
            highlight: false,
            value: 50,
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
        ...mockDetailedData,
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
            value: 100,
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
        ...mockDetailedData,
      },
      {
        ...mockedPlayers[1],
        ...mockDetailedData,
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
            highlight: true,
            value: 100,
          },
        ],
      },
      {
        title: 'Gonza',
        columns: [
          {
            description: 'Round One',
            highlight: false,
            value: 120,
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
        ...mockDetailedData,
      },
      {
        ...mockedPlayers[1],
        ...mockDetailedData,
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
            highlight: true,
            value: '07:50',
          },
        ],
      },
      {
        title: 'Gonza',
        columns: [
          {
            description: 'Round Five',
            highlight: false,
            value: 'DNF',
          },
        ],
      },
    ])
  })
})
