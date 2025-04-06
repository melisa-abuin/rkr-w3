import Loader from '@/components/atoms/loader'
import { LoaderContainer } from './styled'
import { Td, Tr } from '../row/styled'

export default function LoaderCard() {
  return [...Array(5)].map((_, rowIndex) => (
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
  ))
}
