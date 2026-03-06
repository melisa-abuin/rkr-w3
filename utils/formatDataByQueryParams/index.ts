interface FilterByBattleTagParams<T extends { battleTag?: { name?: string } }> {
  data: T[]
  battleTag?: string
}

interface SortDataParams<T, K extends string> {
  data: T[]
  sortKey?: K
  sortOrder?: 'asc' | 'desc'
  getSortCondition: (sortKey: K, a: T, b: T) => boolean | undefined
}

interface PaginateDataParams<T> {
  data: T[]
  page?: number
  pageSize?: number
}

/**
 * Filters data by player battle tag name.
 */
export const filterByBattleTag = <T extends { battleTag?: { name?: string } }>({
  data,
  battleTag,
}: FilterByBattleTagParams<T>) => {
  let filteredData = data

  if (battleTag) {
    filteredData = data.filter(({ battleTag: playerBattleTag }) =>
      (playerBattleTag?.name || '')
        .toLowerCase()
        .includes(battleTag.toLowerCase()),
    )
  }

  return filteredData
}

/**
 * Sorts data with a comparator condition callback.
 */
export const sortData = <T, K extends string>({
  data,
  sortKey,
  sortOrder = 'desc',
  getSortCondition,
}: SortDataParams<T, K>) => {
  let sortedData = data

  if (sortKey) {
    sortedData = [...data].sort((a, b) => {
      const condition = getSortCondition(sortKey, a, b)

      if (condition === undefined) return 0

      return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
    })
  }

  return sortedData
}

/**
 * Returns paginated data and total pages.
 */
export const paginateData = <T>({
  data,
  page = 1,
  pageSize = 15,
}: PaginateDataParams<T>) => {
  const totalPages = Math.ceil(data.length / pageSize)
  const initialIndex = (Number(page) - 1) * pageSize

  return {
    stats: data.slice(initialIndex, initialIndex + pageSize),
    pages: totalPages,
  }
}
