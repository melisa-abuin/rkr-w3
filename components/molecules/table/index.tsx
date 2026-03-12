'use client'

import React, { ReactNode } from 'react'
import {
  StyledTable,
  StyledTh,
  StyledTr,
  StyledTd,
  Container,
  Title,
} from './styled'
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
    <Container aria-labelledby={title || 'Player stats'}>
      <StyledTable aria-label="Player Stats">
        <caption id={title || 'Player stats'}>
          {title && (
            <Title>
              <span>{title}</span>
              {headerLink}
            </Title>
          )}
          {filters}
        </caption>
        <thead>
          <StyledTr>
            {cols.map(({ key, title }) => (
              <StyledTh
                colSpan={1}
                hasActions={!!onTableSort}
                highlighted={highlightedColumn === key}
                key={key as string}
                onClick={() => onTableHeadClick(key)}
                scope="col"
              >
                {title}
              </StyledTh>
            ))}
          </StyledTr>
        </thead>
        {loading ? (
          <LoaderTable columns={cols.length} rows={pageSize} />
        ) : (
          <tbody>
            {data?.map((player, index) => (
              <tr key={index}>
                {cols.map(({ key, title, render }) => {
                  const renderer = renderers[key as string] ?? defaultRenderer
                  return (
                    <StyledTd
                      data-label={title}
                      highlighted={highlightedColumn === key}
                      index={index}
                      key={`${key as string} ${index}`}
                    >
                      {render
                        ? render(player, difficultyFilter)
                        : renderer(player[key], difficultyFilter)}
                    </StyledTd>
                  )
                })}
              </tr>
            ))}
          </tbody>
        )}
      </StyledTable>
    </Container>
  )
}
