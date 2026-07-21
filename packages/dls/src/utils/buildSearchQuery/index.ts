type SearchParams = Record<string, string | string[] | undefined>

/**
 * Serializes a Next.js `searchParams` object into a URL query string.
 *
 * Entries with an `undefined` value or the reserved `filter` key are skipped.
 * Array values are appended as multiple params with the same key.
 *
 * @param searchParams - Key/value map of URL search parameters.
 * @returns A query string prefixed with `?`, or an empty string when there are no params.
 */
export const buildSearchQuery = (searchParams: SearchParams): string => {
  const query = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined || key === 'filter') return

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item))
      return
    }

    query.set(key, value)
  })

  const queryString = query.toString()
  return queryString ? `?${queryString}` : ''
}
