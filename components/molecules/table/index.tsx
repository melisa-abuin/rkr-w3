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
import LoaderTable from './components/loaderTable'
import TableData from './components/tableData'
import { Difficulty } from '@/interfaces/difficulty'

interface Props<T> {
  data?: T[]
  loading?: boolean
  difficultyFilter?: Difficulty | undefined
  filters?: ReactNode
  headerLink?: ReactNode
  title?: string
  columns: Array<{
    title: string
    key: keyof T
  }>
  highlightedColumn?: keyof T
  onTableSort?: (columnKey: keyof T) => void
  pageSize?: number
}

export default function Table<T>({
  data,
  loading = false,
  columns,
  difficultyFilter,
  filters,
  headerLink,
  highlightedColumn,
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

  return (
    <Container aria-labelledby={title || 'Player stats'}>
      <StyledTable aria-label="Player Stats">
        <caption id={title || 'Player stats'}>
          <Title>
            {title && <span>{title}</span>}
            {headerLink}
          </Title>
          {filters}
        </caption>
        <thead>
          <StyledTr>
            {columns.map(({ key, title }) => (
              <StyledTh
                key={key as string}
                hasActions={!!onTableSort}
                highlighted={highlightedColumn === key}
                onClick={() => onTableHeadClick(key)}
                scope="col"
                colSpan={1}
              >
                {title}
              </StyledTh>
            ))}
          </StyledTr>
        </thead>
        {loading ? (
          <LoaderTable columns={columns.length} rows={pageSize} />
        ) : (
          <tbody>
            {data?.map((player, index) => (
              <tr key={index}>
                {columns.map(({ key, title }) => (
                  <StyledTd
                    data-label={title}
                    highlighted={highlightedColumn === key}
                    index={index}
                    key={`${key as string} ${index}`}
                  >
                    <TableData
                      keyName={key}
                      data={player}
                      difficultyFilter={difficultyFilter}
                    />
                  </StyledTd>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </StyledTable>
    </Container>
  )
}
