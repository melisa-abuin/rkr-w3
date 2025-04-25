'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import HelpInfo from '@/components/molecules/helpInfo'
import Tabs from '@/components/atoms/tabs'
import { PlayersStats } from '@/interfaces/player'
import TableWithControls from '@/components/organisms/tableWithControls'
import KibbleTableWithControls from '@/components/organisms/kibbleTableWithControls'
import { useRouter } from 'next/navigation'
import { statsPageVariants } from '@/constants'

interface AllStatsData {
  data: { pages: number; stats?: PlayersStats }
  slug: string
}

type VariantKey = keyof typeof statsPageVariants

const isValidVariant = (slug: string): slug is VariantKey =>
  slug in statsPageVariants

export default function Stats({ data, slug }: AllStatsData) {
  const variantValues = Object.values(statsPageVariants)
  const variantKeys = Object.keys(statsPageVariants)

  const pageVariant = isValidVariant(slug)
    ? statsPageVariants[slug]
    : statsPageVariants['overview']

  const router = useRouter()

  const onTabeChange = (index: number) => {
    const selectedVariantKey = variantKeys[index]
    if (!selectedVariantKey || !isValidVariant(selectedVariantKey)) {
      return
    }

    router.push(
      `/stats/${selectedVariantKey}?page=1&sortKey=${statsPageVariants[selectedVariantKey].defaultSortKey}&sortOrder=desc`,
    )
  }

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
          onTabChange={onTabeChange}
          overrideSelectedIndex={variantValues.findIndex(
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
