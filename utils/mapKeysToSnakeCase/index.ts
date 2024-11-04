//TODO: replace this with camel case insead
export const mapKeysToSnakeCase = (key: string): string =>
  key.toLowerCase().replace(/ : | /g, (match) => (match === ': ' ? ' ' : '_'))
