'use client'

import PageContainer from '@/components/atoms/pageContainer'
import Tabs from '@/components/atoms/tabs'
import TabsLoader from '@/components/molecules/tabsLoader'
import Podium from '@/components/organisms/podium'
import { useHallOfFame } from '@/hooks/useHallOfFame'
import styles from './index.module.css'

const description =
  'Winners of each season. The greatest players are listed here.'

export default function HallOfFame() {
  const { seasons, isLoading } = useHallOfFame()

  if (!isLoading && !seasons.length) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <PageContainer
        align="center"
        background="transparent"
        title="Hall of Fame"
      >
        {isLoading ? (
          <TabsLoader vertical description={description}>
            <div className={styles.season}>
              <Podium compact loading withBase />
            </div>
          </TabsLoader>
        ) : (
          <Tabs
            vertical
            description={description}
            titles={seasons.map(({ seasonName }) => seasonName)}
          >
            {seasons.map(({ seasonId, rankings }) => (
              <div key={seasonId} className={styles.season}>
                <Podium compact withBase podium={rankings} />
              </div>
            ))}
          </Tabs>
        )}
      </PageContainer>
    </div>
  )
}
