'use client'

import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Tabs from '@/components/atoms/tabs'
import { LeagueSeasonData } from '@/interfaces/league'
import { getActiveSeason } from '@/utils'
import { useMemo } from 'react'
import NoActiveSeason from './components/noActiveSeason'
import SeasonContent from './components/seasonContent'

interface SeasonsTemplateProps {
  seasons: LeagueSeasonData[]
}

export default function SeasonsTemplate({ seasons }: SeasonsTemplateProps) {
  const currentSeason = useMemo(() => {
    const activeSeason = getActiveSeason(seasons.map(({ season }) => season))
    return seasons.find(({ season }) => season.id === activeSeason?.id)
  }, [seasons])

  return (
    <PageContainer marginBottom={24}>
      <PageHeader
        description="Seasons are time-limited competitive periods where players earn league points and climb the rankings. Top players will appear on the podium."
        title="Seasons"
      />
      <Tabs
        titles={['Current', ...seasons.map(({ season }) => season.leagueId)]}
      >
        {[
          currentSeason ? (
            <SeasonContent key="current" seasonData={currentSeason} />
          ) : (
            <NoActiveSeason key="current" />
          ),
          ...seasons.map((seasonData) => (
            <SeasonContent key={seasonData.season.id} seasonData={seasonData} />
          )),
        ]}
      </Tabs>
    </PageContainer>
  )
}
