import Image from 'next/image'
import styled from 'styled-components'

export const StyledImage = styled(Image).attrs<{ $complete?: boolean }>(
  ({ $complete }) => ({
    $complete,
  }),
)<{ $complete?: boolean }>`
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  cursor: pointer;
  filter: ${({ $complete }) => ($complete ? 'none' : 'grayscale(1)')};
  opacity: ${({ $complete }) => ($complete ? '1' : '0.5')};
`
