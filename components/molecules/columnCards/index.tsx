'use client'

import { Card, Container, Header, Footer, Table } from './styled'
import LoaderCard from './components/loaderCard'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import Row from './components/row'
import Link from '@/components/atoms/link'
import { isRoundDifficultyAvailable } from '@/utils/isRoundDifficultyAvailable'
import { Difficulty } from '@/interfaces/difficulty'

interface Props {
  data?: LeaderboardCategories[]
  difficulty?: Difficulty | undefined
  hoverable?: boolean
  loading?: boolean
  filter: 'stats' | 'times'
  selectedPlayer?: string
}

export default function ColumnCards({
  data = [],
  difficulty = undefined,
  hoverable = false,
  loading,
  filter,
  selectedPlayer,
}: Props) {
  const getViewAllHref = (key: string) => {
    const difficultyUrlParam = difficulty ? `&difficulty=${difficulty}` : ''
    return `/stats?filter=${filter}&page=1&sortKey=${key}&sortOrder=desc${difficultyUrlParam}`
  }

  if (loading && data.length === 0) {
    return <LoaderCard />
  }

  return (
    <Container>
      {data
        ?.filter(({ key }) => isRoundDifficultyAvailable(key, difficulty))
        .map(({ category, data, key }) => (
          <Card key={key}>
            <Header>{category}</Header>
            <Table>
              <tbody>
                {data?.map(({ player, data }, index) => (
                  <Row
                    key={index}
                    data={data}
                    hoverable={hoverable}
                    isSelected={selectedPlayer === player.tag}
                    player={player}
                  />
                ))}
                {data.length < 5 &&
                  [...Array(5 - data.length)].map((_, index) => (
                    <Row key={index} hoverable={hoverable} />
                  ))}
              </tbody>
            </Table>
            <Footer>
              <Link color="secondary" href={getViewAllHref(key)}>
                View all
              </Link>
            </Footer>
          </Card>
        ))}
    </Container>
  )
}
