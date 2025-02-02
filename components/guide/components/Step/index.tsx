import Image from 'next/image'
import { Container } from './styled'

interface Props {
  bottomText: string
  imageSrc: string
  topText: string
}
export default function Step({ bottomText, imageSrc, topText }: Props) {
  return (
    <Container>
      <p>{topText}</p>
      <Image
        alt="discord screenshot example"
        height={354}
        src={imageSrc}
        width={640}
      />
      <p>{bottomText}</p>
    </Container>
  )
}
