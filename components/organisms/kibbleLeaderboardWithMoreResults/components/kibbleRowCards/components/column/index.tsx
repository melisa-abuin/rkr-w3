import { Container, Description, Title } from './styled'

interface Props {
  value: number
  description: string
  hideOnMobile?: boolean
}

export default function Column({
  value,
  description,
  hideOnMobile = false,
}: Props) {
  return (
    <Container $hideOnMobile={hideOnMobile}>
      <Title>{value || 0}</Title>
      <Description>{description}</Description>
    </Container>
  )
}
