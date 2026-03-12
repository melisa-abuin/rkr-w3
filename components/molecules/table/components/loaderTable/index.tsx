import Loader from '@/components/atoms/loader'
import { StyledTd } from '../../styled'

interface Props {
  columns: number
  rows: number
}

export default function LoaderTable({ columns, rows }: Props) {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, cellIndex) => (
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
