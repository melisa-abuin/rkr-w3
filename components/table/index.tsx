import React from 'react'
import {
  StyledTable,
  StyledTh,
  StyledTr,
  StyledTd,
  Container,
  Title,
} from './styled'
import { PlayersStats } from '@/interfaces/player'
import BattleTag from './battleTag'

interface TableProps {
  data: PlayersStats | null
}

export default function Table(data: TableProps) {
  return (
    <Container aria-labelledby="scoreboard-title">
      <StyledTable role="table" aria-label="Player Stats">
        <Title id="scoreboard-title">Scoreboard</Title>
        <thead>
          <StyledTr>
            <StyledTh scope="col">Player</StyledTh>
            <StyledTh scope="col">Saves</StyledTh>
            <StyledTh scope="col">Deaths</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
          {data?.data?.map((player, index) => (
            <tr key={index}>
              <StyledTd data-label="Player">
                <BattleTag battletag={player.battletag} />
              </StyledTd>
              <StyledTd data-label="Saves">{player.saves}</StyledTd>
              <StyledTd data-label="Deaths">{player.deaths}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}
