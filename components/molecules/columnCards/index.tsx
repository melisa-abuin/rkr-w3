'use client'
import { Card, Container, Header, Footer, Table, Td, Tr } from './styled'
import LoaderCard from './components/loaderCard'
import { LeaderboardCategories } from '@/interfaces/leaderboard'
import Row from './components/row'

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
  const difficultyUrlParam = difficulty ? `&difficulty=${difficulty}` : ''

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
                  {data?.map(({ data, player }, index) => (
                    <Row
                      data={data}
                      player={player}
                      key={index}
                      hoverable={hoverable}
                    />
                  ))}
                  {data.length < 5 &&
                    [...Array(5 - data.length)].map((_, rowIndex) => (
                      <Tr key={rowIndex}>
                        <Td>--</Td>
                        <Td>--</Td>
                      </Tr>
                    ))}
                </>
              )}
            </tbody>
          </Table>
          <Footer
            href={`/stats/${viewAllKey}?page=1&sortKey=${key}&sortOrder=desc${difficultyUrlParam}`}
          >
            View all
          </Footer>
        </Card>
      ))}
    </Container>
  )
}
