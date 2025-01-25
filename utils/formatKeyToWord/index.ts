/**
 * Splits a camelCase or PascalCase string into words separated by spaces.
 * If the input is undefined or null, returns an empty string.
 *
 * @param str - The string to split.
 * @returns The formatted string with spaces between words.
 */
export const formatKeyToWord = (str?: string): string =>
  str ? str.split(/(?=[A-Z])/).join(' ') : ''
