'use client'

import React, { ReactNode } from 'react'
import { Col, Container, Description } from './styled'
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
}

export default function Columns({
  actionColumn,
  data,
  loading = false,
}: Props) {
  return loading ? (
    <LoaderColumns />
  ) : (
    <Container>
      {data.map(({ title, columns }) =>
        columns.map(({ description, value, highlight }) => (
          <Col key={description}>
            <TextWithIcon
              large
              colorName={highlight ? 'yellow' : undefined}
              iconName={highlight ? 'crown' : undefined}
              palette={highlight ? 'color' : 'text'}
            >
              {value || 0}
            </TextWithIcon>
            <Description>{description}</Description>
          </Col>
        )),
      )}
      {actionColumn && <Col>{actionColumn}</Col>}
    </Container>
  )
}
