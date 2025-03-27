'use client'

import { Container, Message, Wrapper } from './styled'
import { Cross } from '@/components/icons/cross'
import { useTheme } from '@/hooks/useTheme'

type Props = {
  message: string
  onClick: () => void
}
export default function Toast({ message, onClick }: Props) {
  const [theme] = useTheme()

  return (
    <Wrapper>
      <Container onClick={onClick}>
        <Message>{message}</Message>
        <Cross height={16} fill={theme.text.white} width={16} />
      </Container>
    </Wrapper>
  )
}
