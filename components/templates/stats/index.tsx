'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import HelpInfo from '@/components/molecules/helpInfo'
import Tabs from '@/components/atoms/tabs'
import { PlayersStats } from '@/interfaces/player'
import { kibbleColumns, statsColumns, timeAllDiffColumns } from '@/constants'
import TableWithControls from '@/components/organisms/tableWithControls'
import KibbleTableWithControls from '@/components/organisms/kibbleTableWithControls'
import { useRouter } from 'next/navigation'

const timeStrings = {
  title: 'Time stats',
  description: 'Check all the time-based stats',
  columns: timeAllDiffColumns,
  defaultSortKey: 'roundOne',
  apiBaseUrl: 'times',
} as const

const overallStrings = {
  title: 'Overall stats',
  description: 'Check all the general stats for all players',
  columns: statsColumns,
  defaultSortKey: 'completedChallenges',
  apiBaseUrl: 'stats',
} as const

const kibbleStrings = {
  title: 'Kibble stats',
  description: 'Check all the kibble stats for all players',
  columns: kibbleColumns,
  defaultSortKey: 'collectedSingleGame',
  apiBaseUrl: 'kibbleStats',
} as const

const pageVariants = {
  overview: overallStrings,
  time: timeStrings,
  kibble: kibbleStrings,
} as const

interface AllStatsData {
  data: { pages: number; stats?: PlayersStats }
  slug: string
}

type VariantKey = keyof typeof pageVariants

const isValidVariant = (slug: string): slug is VariantKey =>
  slug in pageVariants

export default function Stats({ data, slug }: AllStatsData) {
  const variantValues = Object.values(pageVariants)
  const variantKeys = Object.keys(pageVariants)

  const pageVariant = isValidVariant(slug)
    ? pageVariants[slug]
    : pageVariants['overview']

  const router = useRouter()

  return (
    <>
      <PageContainer>
        <PageHeader
          description="Overall times and scores of Run Kitty Run players. The scores shown on this page are subject to the files uploaded by the players, if a player is not present in this table it is because they have not uploaded their statistics in the latest versions of the game"
          title="Scoreboard"
        />
      </PageContainer>
      <PageContainer>
        <Tabs
          onTabChange={(index) =>
            router.push(
              `/stats/${variantKeys[index]}?page=1&sortKey=${pageVariants[variantKeys[index]].defaultSortKey}&sortOrder=desc`,
            )
          }
          defaultSelectedIndex={variantValues.findIndex(
            ({ title }) => title === pageVariant.title,
          )}
          titles={variantValues.map(({ title }) => title)}
        >
          {variantValues.map(
            ({ title, columns, defaultSortKey, apiBaseUrl }, index) => {
              if (title === 'Kibble stats') {
                return (
                  <KibbleTableWithControls
                    key={index}
                    columns={columns}
                    data={{
                      ...data,
                      stats: data.stats?.map((elem) => ({
                        battleTag: elem.battleTag,
                        ...elem.kibbles,
                      })),
                    }}
                    defaultSortKey={defaultSortKey}
                    apiBaseUrl={apiBaseUrl}
                    title={title}
                  />
                )
              }
              return (
                <TableWithControls
                  key={index}
                  columns={columns}
                  data={data}
                  defaultSortKey={defaultSortKey}
                  apiBaseUrl={apiBaseUrl}
                  title={title}
                />
              )
            },
          )}
        </Tabs>
      </PageContainer>
      <HelpInfo />
    </>
  )
}
