'use client'
import { BestTime } from '@/interfaces/player'
import {
  Card,
  Container,
  Header,
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
  data?: { category: string; data: Data[] }[]
  title: string
}

export default function ColumnCards({ data, title }: Props) {
  return (
    <PageContainer ariaLabelledby="columns-card-title" marginTop={32}>
      <Title id="columns-card-title">{title}</Title>
      <Container>
        {data?.map(({ category, data }) => (
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
          </Card>
        ))}
      </Container>
    </PageContainer>
  )
}
