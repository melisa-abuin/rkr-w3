'use client'

import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Tabs from '@/components/atoms/tabs'
import HelpInfo from '@/components/molecules/helpInfo'
import TableWithControls from '@/components/organisms/tableWithControls'
import { statsPageVariants } from '@/constants'
import {
  kibbleColumnsWithRender,
  KibbleRow,
  leagueScoreboardBreakdownColumns,
  statsColumnsWithRender,
  timeAllDiffColumnsWithRender,
} from '@/constants/tableColumns'
import { useStatsFilters } from '@/hooks/useStatsFilters'
import { Difficulty } from '@/interfaces/difficulty'
import { KibbleStats } from '@/interfaces/leaderboard'
import { LeagueScoreboardBreakdown } from '@/interfaces/league'
import { BattleTag, Player } from '@/interfaces/player'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface AllStatsData {
  data: {
    pages: number
    stats?: Player[] | KibbleStats[] | LeagueScoreboardBreakdown[]
  }
  filter: string
  seasonOptions?: { label: string; value: string }[]
}

type LeagueScoreboardBreakdownRow = LeagueScoreboardBreakdown & {
  battleTag: BattleTag
}

const getSortValue = (
  columns: { title: string; key: string }[],
  currentSortKey: string,
) => {
  const isValidSort = columns.find(({ key }) => key === currentSortKey)
  return isValidSort ? currentSortKey : columns[0].key
}

type VariantKey = keyof typeof statsPageVariants

const isValidVariant = (slug: string): slug is VariantKey =>
  slug in statsPageVariants

export default function Stats({ data, filter, seasonOptions }: AllStatsData) {
  console.log('Stats data:', data)
  const columnsByVariant = {
    stats: statsColumnsWithRender,
    times: timeAllDiffColumnsWithRender,
    kibble: kibbleColumnsWithRender,
    breakdown: leagueScoreboardBreakdownColumns,
  }

  const {
    currentApiUrl,
    setCurrentApiUrl,
    currentPage,
    setCurrentPage,
    currentSeason,
    setCurrentSeason,
    difficultyFilter,
    setDifficultyFilter,
    sortKey,
    setSortKey,
    player,
    setPlayer,
    debouncedQuery,
  } = useStatsFilters()

  const variantValues = Object.values(statsPageVariants)
  const variantKeys = Object.keys(statsPageVariants)

  const defaultTabIndex = variantValues.findIndex(
    ({ apiBaseUrl }) => apiBaseUrl === filter,
  )
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentColumns, setCurrentColumns] = useState(
    variantValues[defaultTabIndex]?.columns || null,
  )

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
      asc: newPageVariant.defaultSortOrder === 'asc',
    })
    setCurrentPage(1)
    setCurrentSeason('')
  }

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    if (difficultyFilter) params.set('difficulty', difficultyFilter)
    if (currentSeason) params.set('season', currentSeason)

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
    currentSeason,
    debouncedQuery,
  ])

  const syncURL = useCallback(() => {
    window.history.pushState(null, '', `?${queryString}`)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [queryString])

  useEffect(() => {
    syncURL()
  }, [syncURL])

  const handlePlayerChange = useCallback(
    (player: string) => {
      setHasInteracted(true)
      setPlayer(player)
    },
    [setPlayer],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setHasInteracted(true)
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const handleSortChange = useCallback(
    (newSortKey: string) => {
      const currentPageVariant = statsPageVariants[currentApiUrl as VariantKey]
      const isAscending = currentPageVariant.defaultSortOrder === 'asc'

      setHasInteracted(true)
      setSortKey((prev) => ({
        key: newSortKey,
        asc: prev.key === newSortKey ? !prev.asc : isAscending,
      }))
    },
    [currentApiUrl, setSortKey],
  )

  const handleFilterChange = useCallback(
    (difficulty?: Difficulty) => {
      setHasInteracted(true)
      setDifficultyFilter(difficulty)
      setCurrentPage(1)
    },
    [setDifficultyFilter, setCurrentPage],
  )

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
              player: player,
              queryString,
              shouldRefetch: hasInteracted,
            }

            if (apiBaseUrl === 'breakdown') {
              return (
                <TableWithControls<LeagueScoreboardBreakdownRow>
                  {...commonProps}
                  key={apiBaseUrl}
                  columns={columnsByVariant.breakdown}
                  data={{
                    pages: data.pages,
                    stats: data.stats,
                  }}
                  sortKey={
                    (getSortValue(columns, sortKey.key) ||
                      defaultSortKey) as keyof LeagueScoreboardBreakdown
                  }
                />
              )
            }

            if (apiBaseUrl === 'kibble') {
              return (
                <TableWithControls<KibbleRow>
                  {...commonProps}
                  key={apiBaseUrl}
                  columns={columnsByVariant.kibble}
                  data={{
                    ...data,
                    stats: (data as { stats?: KibbleStats[] }).stats?.map(
                      (elem) => ({
                        battleTag: elem.battleTag,
                        ...elem.kibbles,
                      }),
                    ),
                  }}
                  sortKey={
                    (getSortValue(columns, sortKey.key) ||
                      defaultSortKey) as keyof KibbleRow
                  }
                />
              )
            }

            return (
              <TableWithControls<Player>
                {...commonProps}
                key={apiBaseUrl}
                columns={columnsByVariant[apiBaseUrl]}
                data={{
                  pages: data.pages,
                  stats: data.stats as Player[] | undefined,
                }}
                defaultSeasonValue={
                  apiBaseUrl === 'times' ? currentSeason : undefined
                }
                difficulty={difficultyFilter}
                handleDifficultyChange={handleFilterChange}
                handleSeasonChange={
                  apiBaseUrl === 'times'
                    ? ({ value }) => {
                        setHasInteracted(true)
                        setCurrentSeason(value)
                      }
                    : undefined
                }
                seasonOptions={
                  apiBaseUrl === 'times' ? seasonOptions : undefined
                }
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
