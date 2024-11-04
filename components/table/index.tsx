'use client'

import React from 'react'
import {
  StyledTable,
  StyledTh,
  StyledTr,
  StyledTd,
  Container,
  Title,
} from './styled'
import { PlayersStats, PlayerStats } from '@/interfaces/player'
import LoaderTable from './loaderTable'
import { TableData } from './tableData'
import Link from 'next/link'

interface TableProps {
  data?: PlayersStats
  loading?: boolean
  title: string
  columns: Array<{
    title: string
    key: keyof PlayerStats
  }>
}

export default function Table({
  data,
  loading = false,
  columns,
  title,
}: TableProps) {
  return (
    <Container aria-labelledby="table-title">
      <StyledTable role="table" aria-label="Player Stats">
        <caption id="table-title">
          <Title>
            <span>{title}</span>
            <Link href="#" aria-label="View all stats for players">
              View all stats
            </Link>
          </Title>
        </caption>
        <thead>
          <StyledTr>
            {columns.map((column) => (
              <StyledTh key={column.key} scope="col">
                {column.title}
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
                {columns.map((column) => (
                  <StyledTd
                    key={`${column.key} ${index}`}
                    data-label={column.title}
                    scope="col"
                  >
                    <TableData keyName={column.key} data={player[column.key]} />
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
