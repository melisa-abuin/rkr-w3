'use client'
import { BestTime } from '@/interfaces/player'
import {
  Card,
  Container,
  Header,
  Footer,
  Table,
  Td,
  Tr,
  DefaultCell,
  HoverCell,
} from './styled'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import LoaderCard from './components/loaderCard'

interface Data {
  player: string
  data: number | BestTime
}

interface Props {
  data?: { category: string; data: Data[]; key: string }[]
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
                  {data?.map(({ player, data }, index) => (
                    <Tr
                      key={`${player}${index}`}
                      hoverable={data instanceof Object && hoverable}
                    >
                      <DefaultCell>{player}</DefaultCell>
                      {typeof data === 'number' || typeof data === 'string' ? (
                        <Td>{data}</Td>
                      ) : (
                        <>
                          <DefaultCell>
                            {secondsToSexagesimal(data.time)}
                          </DefaultCell>
                          <HoverCell>{data.difficulty}</HoverCell>
                        </>
                      )}
                    </Tr>
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
