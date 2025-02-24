'use client'

import React, { ReactNode } from 'react'
import { Col, Container, LabelText, ValueText } from './styled'

interface Props {
  actionColumn?: ReactNode
  columns: Array<{ title: string; value?: number }>
}

export default function Columns({ columns, actionColumn }: Props) {
  return (
    <Container>
      {columns.map((column) => (
        <Col key={column.title}>
          <ValueText>{column.value || 0}</ValueText>
          <LabelText>{column.title}</LabelText>
        </Col>
      ))}
      {actionColumn && <Col>{actionColumn}</Col>}
    </Container>
  )
}
