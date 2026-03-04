import Link from '@/components/atoms/link'
import Image from '@/components/atoms/image'
import { BattleTag as BattleTagI, Skins } from '@/interfaces/player'
import { Container, ImageContainer, SubTitle, TextContainer } from './styled'

const formatSkinName = (skin: Skins) => {
  if (!skin.selectedSkin) return '/potm.png'
  return `/awards/${skin.selectedSkin[0].toLowerCase()}${skin.selectedSkin.slice(1)}.png`
}

interface Props {
  battleTag: BattleTagI
  skins: Skins
}

export default function BattleTag({ battleTag, skins }: Props) {
  return (
    <Container>
      <ImageContainer>
        <Image
          alt={battleTag.tag}
          colored
          fallbackSrc={'/potm.png'}
          src={formatSkinName(skins)}
        />
      </ImageContainer>
      <TextContainer>
        <Link
          color="brandSecondary"
          href={`/player/${encodeURIComponent(battleTag.tag)}`}
        >
          {battleTag.name}
        </Link>
        <SubTitle>{battleTag.tag}</SubTitle>
      </TextContainer>
    </Container>
  )
}
