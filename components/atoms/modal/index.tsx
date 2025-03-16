import React, { ReactNode } from 'react'
import { Body, Button, Container, Content, Header, Title } from './styled'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <Container>
      <Content>
        <Header>
          {title && <Title>{title}</Title>}
          <Button onClick={onClose} aria-label="Close modal">
            ✕
          </Button>
        </Header>

        <Body>{children}</Body>
      </Content>
    </Container>
  )
}
