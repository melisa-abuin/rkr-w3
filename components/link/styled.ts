import styled from 'styled-components'
import Link from 'next/link'

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  background-color: inherit;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 3px;
  padding: 8px 16px;
  text-decoration: none;
  width: fit-content;
`
