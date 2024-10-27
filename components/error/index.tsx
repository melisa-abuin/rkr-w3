import { Button, Container } from './styled'

export default function Error() {
  return (
    <Container>
      <p>There was an error handling the request</p>
      <Button href="/">Return to home</Button>
    </Container>
  )
}
