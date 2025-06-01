import { ReactNode, useState } from 'react'
import { Body, Container, Header } from './styled'

interface CollapsibleProps {
  children?: ReactNode
  title: string
}

export default function Collapsible({ children, title }: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  //        {isCollapsed ? <Plus /> : <Minus />}
  return (
    <Container>
      <Header onClick={() => setIsCollapsed((prev) => !prev)}>
        {title}
        {isCollapsed ? '+' : '-'}
      </Header>
      <Body isCollapsed={isCollapsed} aria-hidden={isCollapsed}>
        {children}
      </Body>
    </Container>
  )
}
