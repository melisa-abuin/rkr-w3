'use client'

import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import HelpInfo from '@/components/molecules/helpInfo'
import Tabs from '@/components/atoms/tabs'
import { BattleTag, Kibbles, Player } from '@/interfaces/player'
import TableWithControls from '@/components/organisms/tableWithControls'
import { statsPageVariants } from '@/constants'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Difficulty } from '@/interfaces/difficulty'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

interface AllStatsData {
  data: { pages: number; stats?: Player[] }
  filter: string
}

interface SortingKey {
  key: string
  asc: boolean
}

const getSortValue = (
  columns: { title: string; key: string }[],
  currentSortKey: string,
) => {
  const isValidSort = columns.find(({ key }) => key === currentSortKey)
  return isValidSort ? currentSortKey : columns[0].key
}

type VariantKey = keyof typeof statsPageVariants

type KibbleType = Kibbles & {
  battleTag: BattleTag
}

const isValidVariant = (slug: string): slug is VariantKey =>
  slug in statsPageVariants

export default function Stats({ data, filter }: AllStatsData) {
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)
  const initialApi = searchParams?.get('filter') || 'stats'

  const initialFilter = searchParams?.get('difficulty') as
    | Difficulty
    | undefined
  const initialSortKey = (searchParams?.get('sortKey') as string) || ''
  const initialSortOrder = searchParams?.get('sortOrder') === 'asc'
  const initialPlayer = searchParams?.get('battleTag') || ''

  const variantValues = Object.values(statsPageVariants)
  const variantKeys = Object.keys(statsPageVariants)

  const defaultTabIndex = variantValues.findIndex(
    ({ apiBaseUrl }) => apiBaseUrl === filter,
  )
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentApiUrl, setCurrentApiUrl] = useState<string>(initialApi)
  const [currentColumns, setCurrentColumns] = useState(
    variantValues[defaultTabIndex]?.columns || null,
  )

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >(initialFilter)
  const [sortKey, setSortKey] = useState<SortingKey>({
    key: initialSortKey,
    asc: initialSortOrder,
  })
  const [player, setPlayer] = useState<string>(initialPlayer)
  const debouncedQuery = useDebouncedValue(player, 300)

  const onTabChange = (index: number) => {
    const selectedVariantKey = variantKeys[index]

    if (!selectedVariantKey || !isValidVariant(selectedVariantKey)) {
      return
    }

    const newPageVariant = statsPageVariants[selectedVariantKey]

    setHasInteracted(true)
    setCurrentApiUrl(newPageVariant.apiBaseUrl)
    setCurrentColumns(variantValues[index].columns)

    // Reset filters and sorting when changing tabs
    setDifficultyFilter(undefined)
    setSortKey({
      key: newPageVariant.defaultSortKey,
      asc: false,
    })
    setCurrentPage(1)
  }

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    if (difficultyFilter) params.set('difficulty', difficultyFilter)

    const sortValue = getSortValue(currentColumns, sortKey.key)

    params.set('sortKey', sortValue)
    params.set('sortOrder', sortKey.asc ? 'asc' : 'desc')
    params.set('filter', currentApiUrl)
    params.set('battleTag', debouncedQuery)

    return params.toString()
  }, [
    currentPage,
    difficultyFilter,
    sortKey.key,
    sortKey.asc,
    currentApiUrl,
    currentColumns,
    debouncedQuery,
  ])

  const syncURL = useCallback(() => {
    window.history.pushState(null, '', `?${queryString}`)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [queryString])

  useEffect(() => {
    syncURL()
  }, [syncURL])

  const handlePlayerChange = useCallback((player: string) => {
    setHasInteracted(true)
    setPlayer(player)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setHasInteracted(true)
    setCurrentPage(page)
  }, [])

  const handleSortChange = useCallback((newSortKey: string) => {
    setHasInteracted(true)
    setSortKey((prev) => ({
      key: newSortKey,
      asc: prev.key === newSortKey ? !prev.asc : false,
    }))
  }, [])

  const handleFilterChange = useCallback((difficulty?: Difficulty) => {
    setHasInteracted(true)
    setDifficultyFilter(difficulty)
    setCurrentPage(1)
  }, [])

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
          defaultIndex={variantValues.findIndex(
            ({ apiBaseUrl }) => apiBaseUrl === filter,
          )}
          titles={variantValues.map(({ title }) => title)}
          onTabChange={onTabChange}
        >
          {variantValues.map(({ columns, defaultSortKey, apiBaseUrl }) => {
            const commonProps = {
              apiBaseUrl,
              currentPage,
              handlePageChange,
              handlePlayerChange,
              handleSortChange,
              player: initialPlayer,
              queryString,
              shouldRefetch: hasInteracted,
            }

            if (apiBaseUrl === 'kibbleStats') {
              return (
                <TableWithControls<KibbleType>
                  {...commonProps}
                  key={apiBaseUrl}
                  columns={
                    columns as { title: string; key: keyof KibbleType }[]
                  }
                  data={{
                    ...data,
                    stats: data.stats?.map((elem) => ({
                      battleTag: elem.battleTag,
                      ...elem.kibbles,
                    })),
                  }}
                  sortKey={
                    (getSortValue(columns, sortKey.key) ||
                      defaultSortKey) as keyof KibbleType
                  }
                />
              )
            }

            return (
              <TableWithControls<Player>
                {...commonProps}
                key={apiBaseUrl}
                columns={columns as { title: string; key: keyof Player }[]}
                data={data}
                difficulty={difficultyFilter}
                handleDifficultyChange={handleFilterChange}
                sortKey={
                  (getSortValue(columns, sortKey.key) ||
                    defaultSortKey) as keyof Player
                }
              />
            )
          })}
        </Tabs>
      </PageContainer>
      <HelpInfo />
    </>
  )
}
