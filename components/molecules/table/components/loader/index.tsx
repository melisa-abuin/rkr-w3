import LoaderSkeleton from '@/components/atoms/loader'
import { StyledTd } from '../../styled'

interface Props {
  columns: number
  rows: number
}

export default function Loader({ columns, rows }: Props) {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((_, cellIndex) => (
            <StyledTd key={cellIndex}>
              <br />
              <LoaderSkeleton height={20} />
            </StyledTd>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
