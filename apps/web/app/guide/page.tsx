import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import Step from '@rkr/dls/components/atoms/step'
import { discordGuideSteps } from '@rkr/dls/constants'

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
