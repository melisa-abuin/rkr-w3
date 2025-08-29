'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import HelpInfo from '@/components/molecules/helpInfo'
import Tabs from '@/components/atoms/tabs'
import { Player } from '@/interfaces/player'
import TableWithControls from '@/components/organisms/tableWithControls'
import KibbleTableWithControls from '@/components/organisms/kibbleTableWithControls'
import { statsPageVariants } from '@/constants'
import { useState } from 'react'

interface AllStatsData {
  data: { pages: number; stats?: Player[] }
  filter: string
}

type VariantKey = keyof typeof statsPageVariants

const isValidVariant = (slug: string): slug is VariantKey =>
  slug in statsPageVariants

export default function Stats({ data, filter }: AllStatsData) {
  const variantValues = Object.values(statsPageVariants)
  const variantKeys = Object.keys(statsPageVariants)

  const [hasInteracted, setHasInteracted] = useState(false)
  const [defaultQueryString, setDefaultQueryString] = useState<string | null>(
    null,
  )

  const onTabChange = (index: number) => {
    const selectedVariantKey = variantKeys[index]

    if (!selectedVariantKey || !isValidVariant(selectedVariantKey)) {
      return
    }

    const newPageVariant = statsPageVariants[selectedVariantKey]

    setHasInteracted(true)
    setDefaultQueryString(
      `/stats?filter=${newPageVariant.apiBaseUrl}&page=1&sortKey=${newPageVariant.defaultSortKey}&sortOrder=desc`,
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
          onTabChange={onTabChange}
          defaultIndex={variantValues.findIndex(
            ({ apiBaseUrl }) => apiBaseUrl === filter,
          )}
          titles={variantValues.map(({ title }) => title)}
        >
          {variantValues.map(
            ({ title, columns, defaultSortKey, apiBaseUrl }, index) => {
              if (title === 'Kibble stats') {
                return (
                  <KibbleTableWithControls
                    shouldRefetch={hasInteracted}
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
                  defaultQueryString={defaultQueryString}
                  shouldRefetch={hasInteracted}
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
