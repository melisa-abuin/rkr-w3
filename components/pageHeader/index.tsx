'use client'

import { Header, Info, Title } from './styled'

interface Props {
  align?: 'center' | 'flex-start'
  description: string
  title: string
}

export default function PageHeader({
  align = 'center',
  description,
  title,
}: Props) {
  return (
    <Header align={align}>
      <Title>{title}</Title>
      <Info align={align}>{description}</Info>
    </Header>
  )
}
