import { Discord } from '@/components/icons/discord'
import Button from '@rkr/dls/components/atoms/button'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import VerticalCard from '@rkr/dls/components/molecules/verticalCard'

export default function AdminPage() {
  return (
    <main>
      <PageContainer>
        <PageHeader description="" title="Login" />
        <VerticalCard
          circularImage={false}
          imageFallbackSrc="/rkr-icon-primary-x64.png"
          imageSrc="/rkr-icon-primary-x64.png"
          label="RKR Admin"
        >
          <Button colorName="discord" href="/api/auth/discord" variant="solid">
            Login with <Discord />
          </Button>
        </VerticalCard>
      </PageContainer>
    </main>
  )
}
