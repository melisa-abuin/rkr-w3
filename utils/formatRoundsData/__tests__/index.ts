import { formatRoundsData } from '..'

describe('formatRoundsData', () => {
  it('Returns a new object with normal, hard, impossible and a total time calculated', () => {
    const mockedData = {
      RoundOneNormal: 90.2,
      RoundOneHard: 105.2,
      RoundOneImpossible: 150.5,
    }
    expect(formatRoundsData(mockedData, 'One')).toStrictEqual({
      normal: mockedData.RoundOneNormal,
      hard: mockedData.RoundOneHard,
      impossible: mockedData.RoundOneImpossible,
      best: {
        difficulty: 'normal',
        time: mockedData.RoundOneNormal,
      },
    })
  })
})
