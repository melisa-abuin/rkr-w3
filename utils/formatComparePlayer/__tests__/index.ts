import { formatComparePlayer } from '..'
import { formattedMockData } from '@/constants'
import { PlayerStats } from '@/interfaces/player'

describe('formatComparePlayer', () => {
  const mockedPlayers: PlayerStats[] = [...formattedMockData]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('formats data correctly', () => {
    const testColumns = [{ title: 'Saves', key: 'saves' }] as const

    const detailedData = {
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
    }

    const result = formatComparePlayer(
      {
        ...mockedPlayers[0],
        ...detailedData,
      },
      {
        ...mockedPlayers[1],
        ...detailedData,
      },
      testColumns,
      undefined,
    )
    expect(result).toHaveLength(2)
  })

  it.todo('matches the expected shape')
})
