import React from 'react'
import {
  StyledTable,
  StyledTh,
  StyledTr,
  StyledTd,
  Container,
  Title,
} from './styled'

interface PlayerStats {
  name: string
  saves: number
  deaths: number
}

interface TableProps {
  data: PlayerStats[]
}
export default function Table({ data }: TableProps) {
  return (
    <Container aria-labelledby="scoreboard-title">
      <StyledTable role="table" aria-label="Player Stats">
        <Title id="scoreboard-title">Scoreboard</Title>
        <thead>
          <StyledTr>
            <StyledTh scope="col">Name</StyledTh>
            <StyledTh scope="col">Saves</StyledTh>
            <StyledTh scope="col">Deaths</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
          {data.map((player, index) => (
            <tr key={index}>
              <StyledTd data-label="Name">{player.name}</StyledTd>
              <StyledTd data-label="Saves">{player.saves}</StyledTd>
              <StyledTd data-label="Deaths">{player.deaths}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}