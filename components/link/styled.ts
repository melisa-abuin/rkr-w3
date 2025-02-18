import styled from 'styled-components'
import Link from 'next/link'

export const StyledLink = styled(Link)<{ withButtonStyle: boolean }>`
  color: ${({ theme }) => theme.text.tertiary};
  background-color: inherit;
  border: ${({ theme, withButtonStyle }) =>
    withButtonStyle ? `1px solid ${theme.text.tertiary}` : 'none'};
  border-radius: 3px;
  padding: ${({ withButtonStyle }) => (withButtonStyle ? '8px 16px' : '0')};
  text-decoration: none;
  width: fit-content;
`
