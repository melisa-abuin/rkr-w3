'use client'

import React, { ReactNode } from 'react'
import { Col, Container, Description } from './styled'
import LoaderColumns from './components/loader'
import TextWithIcon from '@/components/atoms/textWithIcon'

interface Props {
  actionColumn?: ReactNode
  columns: Array<{
    description: string
    value?: number | string
    compareValue?: number | string
    isBetter?: boolean
  }>
  loading?: boolean
}

export default function Columns({
  actionColumn,
  columns,
  loading = false,
}: Props) {
  return loading ? (
    <LoaderColumns />
  ) : (
    <Container>
      {columns.map(({ description, value, compareValue, isBetter }) => (
        <Col key={description}>
          <TextWithIcon
            large
            colorName={!!compareValue && isBetter ? 'yellow' : undefined}
            iconName={isBetter ? 'crown' : undefined}
            palette={compareValue && isBetter ? 'color' : 'text'}
          >
            {value || 0}
          </TextWithIcon>
          {compareValue && (
            <TextWithIcon
              large
              colorName={!isBetter ? 'yellow' : undefined}
              iconName={!isBetter ? 'crown' : undefined}
              palette={!isBetter ? 'color' : 'text'}
            >
              {compareValue || 0}
            </TextWithIcon>
          )}
          <Description>{description}</Description>
        </Col>
      ))}
      {actionColumn && <Col>{actionColumn}</Col>}
    </Container>
  )
}
