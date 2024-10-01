import Player from './player'
import { Container, Title } from './styled'

export default function VideoCarousel() {
  return (
    <Container aria-labelledby="videos-title">
      <Title id="videos-title">Tricks</Title>
      <Player />
    </Container>
  )
}
