import { calculateBestTimeByDifficulty } from '..'

describe('calculateBestTimeByDifficulty', () => {
  it('should return the lowest time and difficulty when normal has the best time', () => {
    const times = { normal: 100, hard: 150, impossible: 200, nightmare: 250 }
    const result = calculateBestTimeByDifficulty(times)
    expect(result).toEqual({ difficulty: 'normal', time: 100 })
  })

  it('should return the lowest time and difficulty when hard has the best time', () => {
    const times = { normal: 120, hard: 110, impossible: 130, nightmare: 140 }
    const result = calculateBestTimeByDifficulty(times)
    expect(result).toEqual({ difficulty: 'hard', time: 110 })
  })

  it('should return the lowest time and difficulty when impossible has the best time', () => {
    const times = { normal: 150, hard: 140, impossible: 130, nightmare: 160 }
    const result = calculateBestTimeByDifficulty(times)
    expect(result).toEqual({ difficulty: 'impossible', time: 130 })
  })

  it('should return the lowest time and difficulty when nightmare has the best time', () => {
    const times = { normal: 150, hard: 140, impossible: 130, nightmare: 100 }
    const result = calculateBestTimeByDifficulty(times)
    expect(result).toEqual({ difficulty: 'nightmare', time: 100 })
  })

  it('should return the first occurrence when all times are the same', () => {
    const times = { normal: 150, hard: 150, impossible: 150, nightmare: 150 }
    const result = calculateBestTimeByDifficulty(times)
    expect(result).toEqual({ difficulty: 'normal', time: 150 })
  })

  it('should handle edge cases where some times are very close', () => {
    const times = {
      normal: 150.01,
      hard: 150.02,
      impossible: 150.03,
      nightmare: 150.04,
    }
    const result = calculateBestTimeByDifficulty(times)
    expect(result).toEqual({ difficulty: 'normal', time: 150.01 })
  })

  it('should handle zero times correctly', () => {
    const times = { normal: 0, hard: 0, impossible: 100, nightmare: 200 }
    const result = calculateBestTimeByDifficulty(times)
    expect(result).toEqual({ difficulty: 'impossible', time: 100 })
  })
})
