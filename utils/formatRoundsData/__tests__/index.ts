import { formatRoundsData } from '..'

describe('formatRoundsData', () => {
  it('Returns a new object with normal, hard, impossible and a total time calculated', () => {
    const mockedData = {
      round1TimeNormal: 90.2,
      round1TimeHard: 105.2,
      round1TimeImpossible: 150.5,
    }
    expect(formatRoundsData(mockedData, 1)).toStrictEqual({
      normal: mockedData.round1TimeNormal,
      hard: mockedData.round1TimeHard,
      impossible: mockedData.round1TimeImpossible,
      best: {
        difficulty: 'normal',
        time: mockedData.round1TimeNormal,
      },
    })
  })
})
