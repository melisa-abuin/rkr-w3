import Image from 'next/image'
import styled from 'styled-components'

export const StyledImage = styled(Image).attrs<{
  $circular?: boolean
  $colored?: boolean
}>(({ $colored }) => ({
  $colored,
}))<{ $colored?: boolean; $circular?: boolean }>`
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: ${({ $circular }) => ($circular ? '50%' : '0px')};
  cursor: pointer;
  filter: ${({ $colored }) => ($colored ? 'none' : 'grayscale(1)')};
  opacity: ${({ $colored }) => ($colored ? '1' : '0.5')};
`
