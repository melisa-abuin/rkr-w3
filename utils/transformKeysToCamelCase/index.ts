import { Skins } from '@/interfaces/player'

/**
 * Formats the received skins data to a camel case format
 *
 * @param data raw data from api
 * @returns camel case formatted data
 */
export const transformKeysToCamelCase = (data: object): Skins => {
  const initialResult = {
    selectedAura: '',
    selectedHat: '',
    selectedSkin: '',
    selectedTrail: '',
    selectedWindwalk: '',
    selectedWings: '',
  }

  return Object.entries(data).reduce((result, [key, value]) => {
    const transformedKey = key.charAt(0).toLowerCase() + key.slice(1)
    if (transformedKey in result) {
      result[transformedKey as keyof Skins] = value
    }

    return result
  }, initialResult)
}
