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
 * Filters records by `battleTag.name` using a case-insensitive partial match.
 *
 * If `battleTag` is not provided, the original dataset is returned unchanged.
 *
 * @param params.data Dataset to filter.
 * @param params.battleTag Search value to match against `battleTag.name`.
 * @returns Filtered dataset or the original data when no search term is provided.
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
 * Sorts records based on a custom comparison condition callback.
 *
 * The `getSortCondition` callback receives two records and returns:
 * - `true` when `a` should come after `b`
 * - `false` when `a` should come before `b`
 * - `undefined` when items should be treated as equal
 *
 * If `sortKey` is not provided, the original dataset is returned unchanged.
 *
 * @param params.data Dataset to sort.
 * @param params.sortKey Key used by `getSortCondition` to choose comparison logic.
 * @param params.sortOrder Sort direction (`asc` or `desc`). Defaults to `desc`.
 * @param params.getSortCondition Comparator-like callback for pairwise ordering.
 * @returns Sorted copy of the dataset when sorting is requested, otherwise original data.
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
 * Splits data into pages and returns the current page slice with page metadata.
 *
 * @param params.data Full dataset to paginate.
 * @param params.page 1-based page index. Defaults to `1`.
 * @param params.pageSize Number of items per page. Defaults to `15`.
 * @returns Object with `stats` (current page items) and `pages` (total page count).
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
