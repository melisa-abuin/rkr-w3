import Step from '@/components/atoms/step'
import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { discordGuideSteps } from '@/constants'

export default async function GuidePage() {
  return (
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
  )
}
