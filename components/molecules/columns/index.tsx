'use client'

import React, { ReactNode } from 'react'
import { Col, Container, Description, Row, SectionTitle, Title } from './styled'
import LoaderColumns from './components/loader'
import TextWithIcon from '@/components/atoms/textWithIcon'

interface ColumnsProps {
  actionColumn?: ReactNode
  data: Array<{
    title?: string
    columns: Array<{
      description: string
      value?: number | string
      highlight?: boolean
    }>
  }>
  loading?: boolean
  title?: string
  variant?: 'primary' | 'secondary'
}

export default function Columns({
  actionColumn,
  data,
  loading = false,
  title,
  variant = 'primary',
}: ColumnsProps) {
  return loading ? (
    <LoaderColumns variant={variant} />
  ) : (
    <Container variant={variant}>
      {title && <SectionTitle>{title}</SectionTitle>}
      {data.map(({ title, columns }, index) => (
        <Row key={index}>
          {title && <Title>{title}</Title>}
          <Row>
            {columns.map(({ description, value, highlight }) => (
              <Col key={description}>
                <TextWithIcon
                  large
                  colorName={highlight ? 'yellow' : undefined}
                >
                  {value || 0}
                </TextWithIcon>
                <Description highlight={highlight}>{description}</Description>
              </Col>
            ))}
            {actionColumn && <Col>{actionColumn}</Col>}
          </Row>
        </Row>
      ))}
    </Container>
  )
}
