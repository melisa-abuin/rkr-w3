import { encode } from 'js-base64'

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
