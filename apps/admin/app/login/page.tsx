import { Discord } from '@/components/icons/discord'
import { getSession } from '@/lib/session'
import Button from '@rkr/dls/components/atoms/button'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import VerticalCard from '@rkr/dls/components/molecules/verticalCard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const token = (await cookies()).get('admin_session')?.value
  const user = token ? await getSession(token) : null

  if (user) {
    redirect('/')
  }

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
          <Button
            as="a"
            colorName="discord"
            href="/api/auth/discord"
            variant="solid"
          >
            Login with <Discord />
          </Button>
        </VerticalCard>
      </PageContainer>
    </main>
  )
}
