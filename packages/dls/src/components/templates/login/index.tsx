import Button from '@/components/atoms/button'
import PageContainer from '@/components/atoms/pageContainer'
import { Discord } from '@/components/icons/discord'
import VerticalCard from '@/components/molecules/verticalCard'
import styles from './index.module.css'

export default function Login() {
  return (
    <div className={styles.pageContainer}>
      <PageContainer>
        <VerticalCard
          circularImage={false}
          imageFallbackSrc="/rkr-icon-primary-x64.png"
          imageSrc="/rkr-icon-primary-x64.png"
          label="RKR Admin"
        >
          <div className={styles.content}>
            <h1>Welcome back</h1>
            <p>RKR community admins can log in with Discord.</p>
            <Button
              as="a"
              colorName="discord"
              href="/api/auth/discord"
              variant="solid"
            >
              Login with <Discord />
            </Button>
          </div>
        </VerticalCard>
      </PageContainer>
    </div>
  )
}
