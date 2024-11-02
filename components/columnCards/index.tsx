'use client'
import { Card, Container, Header, Section, Table, Td } from './styled'

interface Data {
  player: string
  data: number
}

interface Props {
  data: { category: string; data: { player: string; data: number } }[]
}

export default function ColumnCards({ data }: Props) {
  console.dir(data)

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
                    <Td>{data}</Td>
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
