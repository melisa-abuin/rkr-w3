'use client'

import { Header, Info, Title } from './styled'

interface Props {
  description: string
  title: string
}

export default function PageHeader({ title, description }: Props) {
  return (
    <Header>
      <Title>{title}</Title>
      <Info>{description}</Info>
    </Header>
  )
}
