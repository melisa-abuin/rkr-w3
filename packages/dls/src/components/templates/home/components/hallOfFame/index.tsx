'use client'

import PageContainer from '@/components/atoms/pageContainer'
import RowCardsWithImage from '@/components/organisms/rowCardsWithImage'
import {
  LeagueScoreboardBreakdown,
  LeagueScoreboardEntry,
} from '@/interfaces/league'
import { BattleTag, Skins } from '@/interfaces/player'

const hallOfFameColumns = [
  { title: 'League score', key: 'leagueScore' },
  { title: 'Wins', key: 'weightedWins', hideOnMobile: true },
  { title: 'Save ratio', key: 'saveRatio', hideOnMobile: true },
] as const

interface HallOfFameRow extends LeagueScoreboardBreakdown {
  battleTag: BattleTag
  leagueScore: number
  skins: Skins
}

interface HallOfFameProps {
  players: LeagueScoreboardEntry[]
}

export default function HallOfFame({ players }: HallOfFameProps) {
  const data: HallOfFameRow[] = players.slice(0, 3).map((player) => ({
    ...player.breakdown,
    battleTag: player.player,
    leagueScore: player.leagueScore,
    skins: player.selectedData,
  }))

  return (
    <PageContainer title="Hall of Fame">
      <RowCardsWithImage
        columns={hallOfFameColumns}
        data={data}
        loading={false}
      />
    </PageContainer>
  )
}
