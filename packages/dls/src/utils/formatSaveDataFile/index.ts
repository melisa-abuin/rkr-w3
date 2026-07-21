import { encode } from 'js-base64'

/**
 * Converts raw player save data into a Warcraft III preload script.
 *
 * The save payload is base64-encoded, split into fixed-size chunks, and wrapped
 * into `BlzSendSyncData` calls with hex-encoded sequence metadata so the game can
 * reconstruct the original data in order.
 *
 * @param playerSaveData Raw save data string to encode and serialize.
 * @param chunkSize Maximum characters per encoded chunk. Defaults to `180`.
 * @returns A full preload function script string (`PreloadFiles`).
 */
export const formatSaveDataFile = (
  playerSaveData: string,
  chunkSize: number = 180,
): string => {
  const encodedData = encode(playerSaveData)
  const chunks = encodedData.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || []

  const numChunksHex = chunks.length.toString(16).padStart(2, '0').toUpperCase()
  const functionScript: string[] = [
    'function PreloadFiles takes nothing returns nothing',
    '\n\tcall PreloadStart()',
  ]

  chunks.forEach((chunk: string, i: number) => {
    const index = `000000${numChunksHex}000000${(i + 1).toString(16).padStart(2, '0').toUpperCase()}`
    functionScript.push('\tcall Preload( "")')
    functionScript.push(`call BlzSendSyncData("S_TIO","${index}${chunk}")`)
    functionScript.push('call S2I("" )')
  })

  functionScript.push('\tcall PreloadEnd( 0.0 )')
  functionScript.push('')
  functionScript.push('endfunction')

  return functionScript.join('\n')
}
