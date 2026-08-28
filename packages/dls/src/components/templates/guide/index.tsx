import Collapsible from '@/components/atoms/collapsible'
import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import RichTextParagraph from '@/components/atoms/richTextParagraph'
import Step from '@/components/atoms/step'
import { discordGuideSteps } from '@/constants'
import { LeagueGuide } from '@/interfaces/league'
import styles from './index.module.css'

interface GuideTemplateProps {
  league: LeagueGuide | undefined
}

export default function GuideTemplate({ league }: GuideTemplateProps) {
  return (
    <main>
      <PageContainer>
        <PageHeader description="" title="Frequently Asked Questions" />
        {league?.isActive && (
          <Collapsible title={league.title}>
            <div className={styles.content}>
              <RichTextParagraph content={league.content} />
            </div>
          </Collapsible>
        )}
        <PageContainer marginTop={16} withPadding={false}>
          <Collapsible title="How do I upload my stats?">
            <div className={styles.content}>
              {discordGuideSteps.map(
                ({ imageSrcSet, stepTitle, text }, index) => (
                  <Step
                    key={index}
                    imageSrcSet={imageSrcSet}
                    stepTitle={stepTitle}
                    text={text}
                  />
                ),
              )}
            </div>
          </Collapsible>
        </PageContainer>
      </PageContainer>
    </main>
  )
}
