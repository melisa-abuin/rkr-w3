'use client'

import { Difficulty } from '@/interfaces/difficulty'
import { isRoundDifficultyAvailable } from '@/utils'
import { ReactNode } from 'react'
import LoaderTable from './components/loader'
import styles from './index.module.css'

interface TableProps<T> {
  columns: Array<{
    title: string
    key: keyof T
    render?: (data: T, difficultyFilter?: Difficulty) => ReactNode
  }>
  data?: T[]
  difficultyFilter?: Difficulty | undefined
  filters?: ReactNode
  headerLink?: ReactNode
  highlightedColumn?: keyof T
  loading?: boolean
  onTableSort?: (columnKey: keyof T) => void
  pageSize?: number
  title?: string
}

export default function Table<T>({
  columns,
  data,
  difficultyFilter,
  filters,
  headerLink,
  highlightedColumn,
  loading = false,
  onTableSort,
  pageSize = 5,
  title,
}: TableProps<T>) {
  const onTableHeadClick = (columnKey: keyof T) => {
    if (!onTableSort) {
      return
    }
    onTableSort(columnKey)
  }

  const cols = columns.filter(({ key }) =>
    isRoundDifficultyAvailable(key as string, difficultyFilter),
  )

  const getTdClassName = (columnKey: keyof T, rowIndex: number) =>
    [
      styles.td,
      highlightedColumn === columnKey
        ? rowIndex % 2 !== 0
          ? styles.tdHighlightedOdd
          : styles.tdHighlightedEven
        : '',
    ]
      .filter(Boolean)
      .join(' ')

  const renderCellValue = (value: unknown) => {
    if (value === null || value === undefined) return null
    if (typeof value === 'object') return null

    return value as ReactNode
  }

  return (
    <section
      aria-labelledby={title || 'Player stats'}
      className={styles.container}
    >
      <table aria-label="Player Stats" className={styles.table}>
        <caption id={title || 'Player stats'}>
          {title && (
            <div className={styles.title}>
              <span>{title}</span>
              {headerLink}
            </div>
          )}
          {filters}
        </caption>
        <thead>
          <tr className={styles.tr}>
            {cols.map(({ key, title }) => {
              const thClassName = [
                styles.th,
                highlightedColumn === key ? styles.thHighlighted : '',
                !!onTableSort ? styles.thWithActions : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <th
                  key={key as string}
                  className={thClassName}
                  colSpan={1}
                  scope="col"
                  onClick={() => onTableHeadClick(key)}
                >
                  {title}
                </th>
              )
            })}
          </tr>
        </thead>
        {loading ? (
          <LoaderTable columns={cols.length} rows={pageSize} />
        ) : (
          <tbody>
            {data?.map((player, index) => (
              <tr key={index}>
                {cols.map(({ key, title, render }) => {
                  const tdClassName = getTdClassName(key, index)
                  return (
                    <td
                      key={`${key as string} ${index}`}
                      className={tdClassName}
                      data-label={title}
                    >
                      {render
                        ? render(player, difficultyFilter)
                        : renderCellValue(player[key])}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  )
}
