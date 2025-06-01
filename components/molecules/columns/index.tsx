'use client'

import React, { ReactNode } from 'react'
import { Col, Container, Description, Row, Title } from './styled'
import LoaderColumns from './components/loader'
import TextWithIcon from '@/components/atoms/textWithIcon'

interface Props {
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
  variant?: 'primary' | 'secondary'
}

export default function Columns({
  actionColumn,
  data,
  loading = false,
  variant = 'primary',
}: Props) {
  return loading ? (
    <LoaderColumns />
  ) : (
    <Container variant={variant}>
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
