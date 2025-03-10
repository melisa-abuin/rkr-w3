import Footer from '@/components/molecules/footer'
import Step from '@/components/step'
import Navbar from '@/components/navbar'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/pageHeader'
import { discordGuideSteps } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'

export default async function GuidePage() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <PageHeader description="" title="How to upload my stats?" />
        <PageContainer>
          {discordGuideSteps.map(({ imageSrcSet, stepTitle, text }, index) => (
            <Step
              imageSrcSet={imageSrcSet}
              key={index}
              text={text}
              stepTitle={stepTitle}
            />
          ))}
        </PageContainer>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
