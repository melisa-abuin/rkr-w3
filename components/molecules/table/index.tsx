'use client'

import React, { ReactNode } from 'react'
import styles from './index.module.css'
import LoaderTable from './components/loader'
import { renderers, defaultRenderer } from './components/tableData'
import { Difficulty } from '@/interfaces/difficulty'
import { isRoundDifficultyAvailable } from '@/utils'

interface Props<T> {
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
}: Props<T>) {
  const onTableHeadClick = (columnKey: keyof T) => {
    if (!onTableSort) {
      return
    }
    onTableSort(columnKey)
  }

  const cols = columns.filter(({ key }) =>
    isRoundDifficultyAvailable(key as string, difficultyFilter),
  )

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
                  const renderer = renderers[key as string] ?? defaultRenderer
                  const tdClassName = [
                    styles.td,
                    highlightedColumn === key
                      ? index % 2 !== 0
                        ? styles.tdHighlightedOdd
                        : styles.tdHighlightedEven
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <td
                      key={`${key as string} ${index}`}
                      className={tdClassName}
                      data-label={title}
                    >
                      {render
                        ? render(player, difficultyFilter)
                        : renderer(player[key], difficultyFilter)}
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
