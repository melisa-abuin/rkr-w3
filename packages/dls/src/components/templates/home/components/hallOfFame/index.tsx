'use client'

import PageContainer from '@/components/atoms/pageContainer'
import Tabs from '@/components/atoms/tabs'
import Podium from '@/components/organisms/podium'
import { useHallOfFame } from '@/hooks/useHallOfFame'
import styles from './index.module.css'

export default function HallOfFame() {
  const { seasons } = useHallOfFame()

  if (!seasons.length) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <PageContainer
        align="center"
        background="transparent"
        title="Hall of Fame"
      >
        <Tabs
          vertical
          description="Winners of each season. The greatest players are listed here."
          titles={seasons.map(({ seasonName }) => seasonName)}
        >
          {seasons.map(({ seasonId, rankings }) => (
            <div key={seasonId} className={styles.season}>
              <Podium compact withBase podium={rankings} />
            </div>
          ))}
        </Tabs>
      </PageContainer>
    </div>
  )
}
