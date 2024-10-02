import { useState } from 'react'
import Player from './player'
import { Button, Container, IconsContainer, Info, Title } from './styled'
import { tricks } from '@/constants'
import Icon from './icon'

export default function VideoCarousel() {
  const [selectedVideo, setSelectedVideo] = useState(0)

  const selectedTrick = tricks.find((_trick, index) => selectedVideo === index)

  return (
    <Container aria-labelledby="videos-title">
      <Title id="videos-title">Tricks</Title>
      <Player videoUrl={selectedTrick?.videoUrl} />
      <IconsContainer>
        {tricks.map(({ icon }, index) => (
          <Button
            active={selectedVideo === index}
            key={index}
            onClick={() => setSelectedVideo(index)}
          >
            <Icon name={icon} selected={selectedVideo === index} />
          </Button>
        ))}
      </IconsContainer>
      <Info>{selectedTrick?.text}</Info>
    </Container>
  )
}
