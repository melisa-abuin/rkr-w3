//TODO: replace this with camel case insead
export const mapKeysToSnakeCase = (key: string): string =>
  key[0].toLowerCase() +
  key.slice(1).replace(/ : | /g, (match) => (match === ': ' ? ' ' : ''))
