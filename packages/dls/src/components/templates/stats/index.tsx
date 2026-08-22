'use client'

import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Tabs from '@/components/atoms/tabs'
import HelpInfo from '@/components/molecules/helpInfo'
import {
  playerStatsApi,
  seasonScoreboardApi,
  statsPageVariants,
} from '@/constants'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { useStatsFilters } from '@/hooks/useStatsFilters'
import { Difficulty } from '@/interfaces/difficulty'
import { KibbleStats } from '@/interfaces/leaderboard'
import { LeagueScoreboardBreakdown } from '@/interfaces/league'
import { BattleTag, Player } from '@/interfaces/player'
import { BreakdownApiEntry } from '@/utils/formatBreakdownRows'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BreakdownTable from './components/breakdownTable'
import KibbleTable from './components/kibbleTable'
import StatsTable from './components/statsTable'
import TimesTable from './components/timesTable'

interface AllStatsData {
  data: {
    pages: number
    stats?:
      | Player[]
      | KibbleStats[]
      | Array<{ player: BattleTag; breakdown: LeagueScoreboardBreakdown }>
  }
  filter: string
  seasonOptions?: { label: string; value: string }[]
  currentSeason?: string
  urlSeason?: string
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

export default function Stats({
  data: initialData,
  filter,
  seasonOptions,
  currentSeason: serverSeason,
  urlSeason,
}: AllStatsData) {
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

  const [hasInteracted, setHasInteracted] = useState(false)

  const onTabChange = (index: number) => {
    const selectedVariantKey = variantKeys[index]

    if (!selectedVariantKey || !isValidVariant(selectedVariantKey)) {
      return
    }

    const newPageVariant = statsPageVariants[selectedVariantKey]

    setHasInteracted(true)
    setCurrentApiUrl(newPageVariant.apiBaseUrl)

    setDifficultyFilter(undefined)
    setSortKey({
      key: newPageVariant.defaultSortKey,
      asc: newPageVariant.defaultSortOrder === 'asc',
    })
    setCurrentPage(1)

    if (newPageVariant.apiBaseUrl === 'breakdown') {
      setCurrentSeason(serverSeason || urlSeason || '')
    } else {
      setCurrentSeason('')
    }
  }

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    if (difficultyFilter) params.set('difficulty', difficultyFilter)
    if (currentSeason) params.set('seasonId', currentSeason)

    const variant =
      statsPageVariants[currentApiUrl as VariantKey] ?? statsPageVariants.stats
    const validSortKey = getSortValue(
      variant.columns as { title: string; key: string }[],
      sortKey.key,
    )

    params.set('sortKey', validSortKey)
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
    currentSeason,
    debouncedQuery,
  ])

  const activeApiUrl = useMemo(() => {
    if (currentApiUrl === 'breakdown') {
      return `${seasonScoreboardApi(Number(currentSeason) || 1)}?${queryString}`
    }
    return `${playerStatsApi}/${currentApiUrl}?${queryString}`
  }, [currentApiUrl, currentSeason, queryString])

  const {
    data: queryData,
    isFetching,
    error,
  } = useApiQuery(activeApiUrl, undefined, {
    enabled: hasInteracted,
  })

  useQueryErrorToast(error, `Couldn't fetch the stats, please try again later.`)

  const activeData = hasInteracted ? queryData : initialData

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

  const commonTableProps = {
    currentPage,
    handlePageChange,
    handlePlayerChange,
    handleSortChange,
    isFetching,
    player,
    sortKey: sortKey.key,
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
          defaultIndex={variantValues.findIndex(
            ({ apiBaseUrl }) => apiBaseUrl === filter,
          )}
          titles={variantValues.map(({ title }) => title)}
          onTabChange={onTabChange}
        >
          <StatsTable
            {...commonTableProps}
            data={activeData as { pages: number; stats?: Player[] } | undefined}
            difficulty={difficultyFilter}
            handleDifficultyChange={handleFilterChange}
          />
          <TimesTable
            {...commonTableProps}
            data={activeData as { pages: number; stats?: Player[] } | undefined}
            defaultSeasonValue={hasInteracted ? currentSeason : urlSeason}
            difficulty={difficultyFilter}
            handleDifficultyChange={handleFilterChange}
            handleSeasonChange={({ value }) => {
              setHasInteracted(true)
              setCurrentSeason(value)
            }}
            seasonOptions={seasonOptions}
          />
          <KibbleTable
            {...commonTableProps}
            data={
              activeData as { pages: number; stats?: KibbleStats[] } | undefined
            }
          />
          <BreakdownTable
            {...commonTableProps}
            data={activeData as BreakdownApiEntry[] | undefined}
            defaultSeasonValue={currentSeason || urlSeason}
            handleSeasonChange={({ value }) => {
              setHasInteracted(true)
              setCurrentSeason(value)
            }}
            seasonOptions={seasonOptions}
          />
        </Tabs>
      </PageContainer>
      <HelpInfo />
    </>
  )
}
