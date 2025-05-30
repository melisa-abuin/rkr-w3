import { hexToRgba } from '..'

describe('hexToRgba', () => {
  it('converts hex to rgba correctly with full alpha', () => {
    expect(hexToRgba('#FF5733', 1)).toBe('rgba(255, 87, 51, 1)')
  })

  it('converts hex to rgba correctly with partial alpha', () => {
    expect(hexToRgba('#00FF00', 0.5)).toBe('rgba(0, 255, 0, 0.5)')
  })

  it('converts black hex to rgba', () => {
    expect(hexToRgba('#000000', 0.3)).toBe('rgba(0, 0, 0, 0.3)')
  })

  it('converts white hex to rgba', () => {
    expect(hexToRgba('#FFFFFF', 0)).toBe('rgba(255, 255, 255, 0)')
  })
})
