import { formatSaveDataFile } from '..'
import { encode } from 'js-base64'

describe('formatSaveDataFile', () => {
  it('should generate a valid PreloadFiles function', () => {
    const input = 'testdata'
    const result = formatSaveDataFile(input)

    expect(result).toContain(
      'function PreloadFiles takes nothing returns nothing',
    )
    expect(result).toContain('\tcall PreloadStart()')
    expect(result).toContain('\tcall PreloadEnd( 0.0 )')
    expect(result).toContain('endfunction')
  })

  it('should correctly encode input data in Base64', () => {
    const input = 'testdata'
    const encodedInput = encode(input)
    const result = formatSaveDataFile(input)

    expect(result).toContain(encodedInput)
  })

  it('should split encoded data into correct chunk sizes', () => {
    const input = 'a'.repeat(500)
    const chunkSize = 120
    const encodedInput = encode(input)
    const expectedChunks =
      encodedInput.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || []

    const result = formatSaveDataFile(input, chunkSize)

    expectedChunks.forEach((chunk) => {
      expect(result).toContain(chunk)
    })
  })

  it('should correctly format chunk index values', () => {
    const input = '1234567890'
    const encodedInput = encode(input)
    const result = formatSaveDataFile(input, 5)

    const numChunksHex = Math.ceil(encodedInput.length / 5)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()

    for (let i = 1; i <= Math.ceil(encodedInput.length / 5); i++) {
      const expectedIndex = `000000${numChunksHex}000000${i.toString(16).padStart(2, '0').toUpperCase()}`
      expect(result).toContain(expectedIndex)
    }
  })

  it('should handle empty input gracefully', () => {
    const result = formatSaveDataFile('')
    expect(result).toContain(
      'function PreloadFiles takes nothing returns nothing',
    )
    expect(result).toContain('\tcall PreloadStart()')
    expect(result).toContain('\tcall PreloadEnd( 0.0 )')
    expect(result).toContain('endfunction')
  })
})
