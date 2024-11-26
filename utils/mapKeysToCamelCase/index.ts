/**
 * Formats the provided key to camel case notation
 * @param key
 * @returns camel case key
 */
export const mapKeysToCamelCase = (key: string): string =>
  key[0].toLowerCase() +
  key.slice(1).replace(/ : | /g, (match) => (match === ': ' ? ' ' : ''))
