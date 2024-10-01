import { useState } from 'react'
import Player from './player'
import { Button, Container, IconsContainer, Info, Title } from './styled'
import { tricks } from '@/constants'
import Image from 'next/image'

export default function VideoCarousel() {
  const [selectedVideo, setSelectedVideo] = useState(0)

  const selectedTrick = tricks.find((_trick, index) => selectedVideo === index)

  return (
    <Container aria-labelledby="videos-title">
      <Title id="videos-title">Tricks</Title>
      <Player videoUrl={selectedTrick?.videoUrl} />
      <IconsContainer>
        {tricks.map(({ alt, icon }, index) => (
          <Button key={index} onClick={() => setSelectedVideo(index)}>
            <Image alt={alt} height={20} src={icon} width={20} />
          </Button>
        ))}
      </IconsContainer>
      <Info>{selectedTrick?.text}</Info>
    </Container>
  )
}
