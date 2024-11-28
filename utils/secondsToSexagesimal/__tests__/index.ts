import { secondsToSexagesimal } from '..'

describe('secondsToSexagesimal', () => {
  it('should return minutes and seconds when input is less than an hour', () => {
    expect(secondsToSexagesimal(135)).toBe('02:15')
    expect(secondsToSexagesimal(45)).toBe('00:45')
    expect(secondsToSexagesimal(3599)).toBe('59:59')
  })

  it('should return hours, minutes, and seconds when input is 1 hour or more', () => {
    expect(secondsToSexagesimal(3600)).toBe('1:00:00')
    expect(secondsToSexagesimal(3665)).toBe('1:01:05')
    expect(secondsToSexagesimal(86399)).toBe('23:59:59')
  })

  it('should handle edge cases such as zero seconds', () => {
    expect(secondsToSexagesimal(0)).toBe('DNF')
  })

  it('should properly handle seconds that are exactly on the hour or minute mark', () => {
    expect(secondsToSexagesimal(60)).toBe('01:00')
    expect(secondsToSexagesimal(7200)).toBe('2:00:00')
    expect(secondsToSexagesimal(180)).toBe('03:00')
  })
})
