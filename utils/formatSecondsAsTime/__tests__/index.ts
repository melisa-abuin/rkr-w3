import { formatSecondsAsTime } from '..'

describe('formatSecondsAsTime', () => {
  it('should return minutes and seconds when input is less than an hour', () => {
    expect(formatSecondsAsTime(135)).toBe('02:15')
    expect(formatSecondsAsTime(45)).toBe('00:45')
    expect(formatSecondsAsTime(3599)).toBe('59:59')
  })

  it('should return hours, minutes, and seconds when input is 1 hour or more', () => {
    expect(formatSecondsAsTime(3600)).toBe('1:00:00')
    expect(formatSecondsAsTime(3665)).toBe('1:01:05')
    expect(formatSecondsAsTime(86399)).toBe('23:59:59')
  })

  it('should handle edge cases such as zero seconds', () => {
    expect(formatSecondsAsTime(0)).toBe('DNF')
  })

  it('should properly handle seconds that are exactly on the hour or minute mark', () => {
    expect(formatSecondsAsTime(60)).toBe('01:00')
    expect(formatSecondsAsTime(7200)).toBe('2:00:00')
    expect(formatSecondsAsTime(180)).toBe('03:00')
  })

  it('should include milliseconds when withMilliseconds is true', () => {
    expect(formatSecondsAsTime(135.123, true)).toBe('02:15.122')
    expect(formatSecondsAsTime(0.001, true)).toBe('00:00.001')
    expect(formatSecondsAsTime(3665.789, true)).toBe('1:01:05.789')
    expect(formatSecondsAsTime(59.999, true)).toBe('00:59.999')
    expect(formatSecondsAsTime(7200.456, true)).toBe('2:00:00.456')
  })
})
