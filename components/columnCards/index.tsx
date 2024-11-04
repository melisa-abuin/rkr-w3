'use client'
import { BestTime } from '@/interfaces/player'
import { Card, Container, Header, Section, Table, Td } from './styled'

interface Data {
  player: string
  data: number | BestTime
}

interface Props {
  data?: { category: string; data: Data[] }[]
}

export default function ColumnCards({ data }: Props) {
  return (
    <Section aria-labelledby="table-title">
      <Container>
        {data?.map(({ category, data }) => (
          <Card key={category}>
            <Header>{category}</Header>
            <Table>
              <tbody>
                {data?.map(({ player, data }) => (
                  <tr key={player}>
                    <Td>{player.split('#')[0]}</Td>
                    {typeof data === 'number' ? (
                      <Td>{data}</Td>
                    ) : (
                      <>
                        <Td>{`${data.time} (${data.difficulty})`}</Td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ))}
      </Container>
    </Section>
  )
}
