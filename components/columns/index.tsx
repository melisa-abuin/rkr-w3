'use client'

import React, { ReactNode } from 'react'
import { Col, Container, LabelText, ValueText } from './styled'

interface ColumnData {
  color?: ReactNode
  value: string | number
  icon?: ReactNode
}

interface Props {
  actionColumn?: ReactNode
  columns: Array<{ description: string; data?: ColumnData[] }>
}

export default function Columns({ columns, actionColumn }: Props) {
  return (
    <Container>
      {columns.map((column) => (
        <Col key={column.description}>
          {column.data?.map((colData) => (
            <ValueText key={colData.value}>{colData.value || 0}</ValueText>
          ))}
          <LabelText>{column.description}</LabelText>
        </Col>
      ))}
      {actionColumn && <Col>{actionColumn}</Col>}
    </Container>
  )
}
