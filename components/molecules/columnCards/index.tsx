'use client'
import { Card, Container, Header, Footer, Table } from './styled'
import LoaderCard from './components/loaderCard'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import Row from './components/row'
import Link from '@/components/atoms/link'

interface Props {
  data?: LeaderboardCategories[]
  difficulty?: string
  hoverable?: boolean
  loading?: boolean
  viewAllKey: 'overview' | 'time'
}

export default function ColumnCards({
  data = [],
  difficulty = undefined,
  hoverable = false,
  loading,
  viewAllKey,
}: Props) {
  const getViewAllHref = (key: string) => {
    const difficultyUrlParam = difficulty ? `&difficulty=${difficulty}` : ''
    return `/stats/${viewAllKey}?page=1&sortKey=${key}&sortOrder=desc${difficultyUrlParam}`
  }

  return (
    <Container>
      {data?.map(({ category, data, key }) => (
        <Card key={category}>
          <Header>{category}</Header>
          <Table>
            <tbody>
              {loading ? (
                <LoaderCard />
              ) : (
                <>
                  {data?.map(({ player, data }, index) => (
                    <Row
                      data={data}
                      player={player}
                      key={index}
                      hoverable={hoverable}
                    />
                  ))}
                  {data.length < 5 &&
                    [...Array(5 - data.length)].map((_, index) => (
                      <Row key={index} hoverable={hoverable} />
                    ))}
                </>
              )}
            </tbody>
          </Table>
          <Footer>
            <Link href={getViewAllHref(key)} color="secondary">
              View all
            </Link>
          </Footer>
        </Card>
      ))}
    </Container>
  )
}
