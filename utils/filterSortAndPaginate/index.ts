/**
 * Input parameters for filtering, sorting, and paginating a list of items.
 */
interface FilterSortAndPaginateParams<
  T extends { battleTag?: { name?: string } },
  K extends string,
> {
  battleTag?: string
  data: T[]
  page?: number
  pageSize?: number
  sortKey?: K
  sortOrder?: 'asc' | 'desc'
  getSortCondition: (sortKey: K, a: T, b: T) => boolean | undefined
}

/**
 * Applies optional battle tag filtering, optional sorting, and pagination.
 *
 * `getSortCondition` should return:
 * - `true` when `a` should come after `b` in descending mode
 * - `false` when `a` should come before `b` in descending mode
 * - `undefined` when elements should be treated as equal
 *
 * @returns Object containing the paginated `stats` and total `pages`.
 */
export const filterSortAndPaginate = <
  T extends { battleTag?: { name?: string } },
  K extends string,
>({
  battleTag,
  data,
  page = 1,
  pageSize = 15,
  sortKey,
  sortOrder = 'desc',
  getSortCondition,
}: FilterSortAndPaginateParams<T, K>) => {
  let filteredData = data

  if (battleTag) {
    filteredData = data.filter(({ battleTag: playerBattleTag }) =>
      (playerBattleTag?.name || '')
        .toLowerCase()
        .includes(battleTag.toLowerCase()),
    )
  }

  let sortedData = filteredData

  if (sortKey) {
    sortedData = [...filteredData].sort((a, b) => {
      const condition = getSortCondition(sortKey, a, b)

      if (condition === undefined) return 0

      return sortOrder === 'asc' ? (condition ? 1 : -1) : condition ? -1 : 1
    })
  }

  const totalPages = filteredData
    ? Math.ceil(filteredData.length / pageSize)
    : 0
  const initialIndex = (Number(page) - 1) * pageSize

  return {
    stats: sortedData.slice(initialIndex, initialIndex + pageSize),
    pages: totalPages,
  }
}
