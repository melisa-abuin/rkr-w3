import Footer from '@/components/molecules/footer'
import Step from '@/components/atoms/step'
import Navbar from '@/components/molecules/navbar'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { discordGuideSteps } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'
import '../../theme/light.css' // TODO: create hook for no styled components theming

export default async function GuidePage() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <PageContainer>
          <PageHeader description="" title="How to upload my stats?" />

          {discordGuideSteps.map(({ imageSrcSet, stepTitle, text }, index) => (
            <Step
              key={index}
              imageSrcSet={imageSrcSet}
              stepTitle={stepTitle}
              text={text}
            />
          ))}
        </PageContainer>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
