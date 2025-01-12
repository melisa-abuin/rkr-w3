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
import { PlayersStats, PlayerStats } from '@/interfaces/player'
import LoaderTable from './components/loaderTable'
import { TableData } from './components/tableData'
import { Difficulty } from '@/interfaces/difficulty'

interface SortingKey {
  key: keyof PlayerStats
  asc: boolean
}

interface TableProps {
  data?: PlayersStats
  loading?: boolean
  difficultyFilter?: Difficulty | undefined
  filters?: ReactNode
  headerLink?: ReactNode
  title: string
  columns: Array<{
    title: string
    key: keyof PlayerStats
  }>
  highlightedColumn?: keyof PlayerStats
  onTableSort?: (callback: (prev: SortingKey) => SortingKey) => void
}

export default function Table({
  data,
  loading = false,
  columns,
  difficultyFilter,
  filters,
  headerLink,
  highlightedColumn,
  onTableSort,
  title,
}: TableProps) {
  const onTableHeadClick = (columnKey: keyof PlayerStats) => {
    if (!onTableSort) {
      return
    }
    onTableSort((prev) => ({
      key: columnKey,
      asc: prev.key === columnKey ? !prev.asc : false,
    }))
  }

  return (
    <Container aria-labelledby={title}>
      <StyledTable aria-label="Player Stats">
        <caption id={title}>
          <Title>
            <span>{title}</span>
            {headerLink}
          </Title>
          {filters}
        </caption>
        <thead>
          <StyledTr>
            {columns.map(({ key, title }) => (
              <StyledTh
                hasActions={!!onTableSort}
                highlighted={highlightedColumn === key}
                key={key}
                onClick={() => onTableHeadClick(key)}
                scope="col"
              >
                {title}
              </StyledTh>
            ))}
          </StyledTr>
        </thead>
        {loading ? (
          <LoaderTable />
        ) : (
          <tbody>
            {data?.map((player, index) => (
              <tr key={index}>
                {columns.map(({ key, title }) => (
                  <StyledTd
                    data-label={title}
                    highlighted={highlightedColumn === key}
                    index={index}
                    key={`${key} ${index}`}
                  >
                    <TableData
                      keyName={key}
                      data={player[key]}
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
