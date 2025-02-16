import Footer from '@/components/footer'
import Step from '@/components/guide/components/Step'
import Navbar from '@/components/navbar'
import { PageContainer } from '@/components/pageContainer'
import PageHeader from '@/components/pageHeader'
import { discordGuideSteps } from '@/constants'
import { ThemeProvider } from '@/hooks/useTheme'

export default async function GuidePage() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <PageHeader
          description="Step by step tutorial on how to upload your stats to the site using the discord server"
          title="Tutorials and frequently asked questions"
        />
        <PageContainer
          ariaLabelledby="columns-score-title"
          title="How to upload my stats?"
        >
          {discordGuideSteps.map(({ imageSrc, text }, index) => (
            <Step imageSrc={imageSrc} key={index} text={text} />
          ))}
        </PageContainer>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
