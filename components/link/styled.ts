import styled from 'styled-components'
import Link from 'next/link'

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text.white};
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 3px;
  padding: 8px 16px;
  text-decoration: none;
  width: fit-content;
`
