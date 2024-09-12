import Image from 'next/image'
import {
  BannerContainer,
  BannerContent,
  Caption,
  Colored,
  Container,
  Info,
  Title,
} from './styled'

export default function Banner() {
  return (
    <BannerContainer>
      <Container>
        <BannerContent>
          <Title>Run Kitty Run</Title>
          <Info>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Info>
          <Info>Join us!</Info>
          <a href="https://discord.com/invite/cQVygqA3">
            <Image
              alt="discord invitation"
              height={53}
              src="/discord.png"
              width={198}
            />
          </a>
          <Caption>
            <Colored>100</Colored> kitties - <Colored>30</Colored> running
          </Caption>
        </BannerContent>
        <Image
          src="/example-image.png"
          alt="Example Image"
          width={400}
          height={300}
        />
      </Container>
    </BannerContainer>
  )
}
