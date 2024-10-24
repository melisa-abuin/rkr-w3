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
import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import Tooltip from './tooltip'

interface TableProps {
  data: PlayersStats | null
}

export default function Table(data: TableProps) {
  console.log(data)
  return (
    <Container aria-labelledby="scoreboard-title">
      <StyledTable role="table" aria-label="Player Stats">
        <Title id="scoreboard-title">Scoreboard (All difficulties)</Title>
        <thead>
          <StyledTr>
            <StyledTh scope="col">Player</StyledTh>
            <StyledTh scope="col">Saves</StyledTh>
            <StyledTh scope="col">S/D Ratio</StyledTh>
            <StyledTh scope="col">Wins</StyledTh>
            <StyledTh scope="col">Games Played</StyledTh>
            <StyledTh scope="col">Best R1 Times</StyledTh>
            <StyledTh scope="col">Best R2 Times</StyledTh>
            <StyledTh scope="col">Best R3 Times</StyledTh>
            <StyledTh scope="col">Best R4 Times</StyledTh>
            <StyledTh scope="col">Best R5 Times</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
          {data?.data?.map((player, index) => (
            <tr key={index}>
              <StyledTd data-label="Player">
                <BattleTag battletag={player.battletag} />
              </StyledTd>
              <StyledTd data-label="Saves">{player.saves}</StyledTd>
              <StyledTd data-label="S/D Ratio">
                {calculateSaveDeathRatio(player.saves, player.deaths)}
              </StyledTd>
              <StyledTd data-label="Wins">
                <Tooltip
                  hard={player.hard_wins}
                  impossible={player.impossible_wins}
                  normal={player.normal_wins}
                />
              </StyledTd>
              <StyledTd data-label="Games Played">
                <Tooltip
                  hard={player.hard_games}
                  impossible={player.impossible_games}
                  normal={player.normal_games}
                />
              </StyledTd>
              <StyledTd data-label="Best R1 Times">
                <Tooltip
                  shouldCalculate
                  hard={player.round_1_time_hard}
                  impossible={player.round_1_time_impossible}
                  normal={player.round_1_time_normal}
                />
              </StyledTd>
              <StyledTd data-label="Best R2 Times">
                <Tooltip
                  shouldCalculate
                  hard={player.round_2_time_hard}
                  impossible={player.round_2_time_impossible}
                  normal={player.round_2_time_normal}
                />
              </StyledTd>
              <StyledTd data-label="Best R3 Times">
                <Tooltip
                  shouldCalculate
                  hard={player.round_3_time_hard}
                  impossible={player.round_3_time_impossible}
                  normal={player.round_3_time_normal}
                />
              </StyledTd>
              <StyledTd data-label="Best R4 Times">
                <Tooltip
                  shouldCalculate
                  hard={player.round_4_time_hard}
                  impossible={player.round_4_time_impossible}
                  normal={player.round_4_time_normal}
                />
              </StyledTd>
              <StyledTd data-label="Best R5 Times">
                <Tooltip
                  shouldCalculate
                  hard={player.round_5_time_hard}
                  impossible={player.round_5_time_impossible}
                  normal={player.round_5_time_normal}
                />
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}
