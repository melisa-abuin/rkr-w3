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
              variant="secondary"
              width={showDifficulty ? 200 : 100}
            />
          </Wrapper>
          <Wrapper>
            <Loader height={20} variant="secondary" width={400} />
          </Wrapper>
        </DetailContainer>
      </PositionCard>
    </DesktopOnly>
  )
}
