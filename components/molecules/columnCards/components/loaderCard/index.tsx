import Loader from '@/components/atoms/loader'
import { LoaderContainer } from './styled'
import { Td, Tr } from '../row/styled'
import { Card, Container, Footer, Header, Table } from '../../styled'

export default function LoaderCard() {
  return (
    <Container>
      {[...Array(5)].map((_, rowIndex) => (
        <Card key={rowIndex}>
          <Header>
            <Loader variant="secondary" height={21} width={100} />
          </Header>
          <Table>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  <Td>
                    <LoaderContainer>
                      <Loader height={17} width={70} />
                    </LoaderContainer>
                  </Td>
                  <Td>
                    <LoaderContainer>
                      <Loader height={17} width={30} />
                    </LoaderContainer>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <Footer>
            <Loader variant="secondary" height={17} width={70} />
          </Footer>
        </Card>
      ))}
    </Container>
  )
}
