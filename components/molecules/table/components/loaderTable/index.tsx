import Loader from '@/components/atoms/loader'
import { StyledTd } from '../../styled'

interface Props {
  lines: number
}

export default function LoaderTable({ lines }: Props) {
  return (
    <tbody>
      {[...Array(lines)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(10)].map((_, cellIndex) => (
            <StyledTd key={cellIndex}>
              <br />
              <Loader height={20} />
            </StyledTd>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
