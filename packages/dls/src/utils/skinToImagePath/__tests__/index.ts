import { skinToImagePath } from '..'

describe('skinToImagePath', () => {
  it('lowercases the first letter and builds the award image path', () => {
    expect(skinToImagePath('GoldenKitty')).toBe('/awards/goldenKitty.png')
  })
})
