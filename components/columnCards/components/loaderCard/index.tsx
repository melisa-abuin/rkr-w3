import Loader from '@/components/loader'
import { Td, Tr } from '../../styled'
import { LoaderContainer } from './styled'

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
