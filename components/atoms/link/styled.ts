import styled from 'styled-components'
import Link from 'next/link'

export const StyledLink = styled(Link).attrs<{
  color: string
  withButtonStyle?: boolean
}>(({ color, withButtonStyle }) => ({
  as: 'a',
  withButtonStyle,
  color,
}))<{ color: string; withButtonStyle?: boolean }>`
  background-color: inherit;
  border: ${({ color, withButtonStyle }) =>
    withButtonStyle ? `1px solid ${color}` : 'none'};
  border-radius: 3px;
  color: ${({ color }) => color};
  padding: ${({ withButtonStyle }) => (withButtonStyle ? '8px 16px' : '0')};
  text-decoration: none;
  text-align: center;
  width: fit-content;
`
