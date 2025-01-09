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
  Title,
  DefaultCell,
  HoverCell,
} from './styled'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'
import { PageContainer } from '../pageContainer'

interface Data {
  player: string
  data: number | BestTime
}

interface Props {
  data?: { category: string; data: Data[]; key: string }[]
  title: string
  viewAllKey: 'overview' | 'time'
}

export default function ColumnCards({ data, viewAllKey, title }: Props) {
  return (
    <PageContainer ariaLabelledby="columns-card-title" marginTop={32}>
      <Title id="columns-card-title">{title}</Title>
      <Container>
        {data?.map(({ category, data, key }) => (
          <Card key={category}>
            <Header>{category}</Header>
            <Table>
              <tbody>
                {data?.map(({ player, data }, index) => (
                  <Tr
                    key={`${player}${index}`}
                    hoverable={data instanceof Object}
                  >
                    <DefaultCell>{player}</DefaultCell>
                    {typeof data === 'number' ? (
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
              </tbody>
            </Table>
            <Footer
              href={`/stats/${viewAllKey}?page=1&sortKey=${key}&sortOrder=desc`}
            >
              View all
            </Footer>
          </Card>
        ))}
      </Container>
    </PageContainer>
  )
}
