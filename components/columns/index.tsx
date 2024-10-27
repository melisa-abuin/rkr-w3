'use client'

import {
  Colored,
  Column,
  ColumnsContainer,
  ColumnsTitle,
  ColumnsWrapper,
  ColumnText,
  ColumnTitle,
} from './styled'
import Image from 'next/image'

export default function Columns() {
  return (
    <ColumnsContainer aria-labelledby="columns-title">
      <ColumnsTitle id="columns-title">Discover the map</ColumnsTitle>
      <ColumnsWrapper>
        <Column>
          <Image
            alt="Difficulty"
            height={100}
            src="/difficulty.png"
            width={100}
          />
          <ColumnTitle>Find your match</ColumnTitle>
          <ColumnText>
            Players can test their skills by selecting from three distinct
            difficulty levels: <Colored>[Normal]</Colored>,{' '}
            <Colored>[Hard]</Colored>, and <Colored>[Impossible]</Colored>. Each
            difficulty comes with its own set of unique challenges, pushing your
            agility, teamwork, and strategy to new limits.
          </ColumnText>
        </Column>
        <Column>
          <Image alt="Co-op game" height={100} src="/coop.png" width={100} />
          <ColumnTitle>Play with friends</ColumnTitle>
          <ColumnText>
            Playing together makes everything more exciting! In this map, you
            and your friends can tackle challenges that are impossible to beat
            alone. Team up to overcome obstacles, support each other, and
            achieve victory as a group.
          </ColumnText>
        </Column>
        <Column>
          <Image
            alt="Tournaments by the community"
            height={100}
            src="/tournament.png"
            width={100}
          />
          <ColumnTitle>Tournaments</ColumnTitle>
          <ColumnText>
            The community hosts thrilling tournaments where the most skilled
            players face off against each other. Compete for glory, sharpen your
            skills, and see who can master the toughest challenges in these
            exciting events!
          </ColumnText>
        </Column>
      </ColumnsWrapper>
    </ColumnsContainer>
  )
}
