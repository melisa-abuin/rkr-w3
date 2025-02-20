'use client'
import { Col, Container, LabelText, ValueText } from './styled'

interface Props {
  columns: Array<{ title: string; value?: number }>
}

export default function Columns({ columns }: Props) {
  return (
    <Container>
      {columns.map((column) => (
        <Col key={column.title}>
          <ValueText>{column.value || 0}</ValueText>
          <LabelText>{column.title}</LabelText>
        </Col>
      ))}
    </Container>
  )
}
