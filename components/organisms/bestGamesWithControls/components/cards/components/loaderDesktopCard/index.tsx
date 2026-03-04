import PositionCard from '@/components/molecules/positionCard'
import { DesktopOnly, DetailContainer, Wrapper } from '../desktopCard/styled'
import Loader from '@/components/atoms/loader'

interface Props {
  position: number
  showDifficulty: boolean
}

export default function LoaderDesktopCard({ position, showDifficulty }: Props) {
  return (
    <DesktopOnly>
      <PositionCard position={position}>
        <DetailContainer>
          <Wrapper>
            <Loader
              height={21}
              width={showDifficulty ? 200 : 100}
              variant="secondary"
            />
          </Wrapper>
          <Wrapper>
            <Loader height={20} width={400} variant="secondary" />
          </Wrapper>
        </DetailContainer>
      </PositionCard>
    </DesktopOnly>
  )
}
