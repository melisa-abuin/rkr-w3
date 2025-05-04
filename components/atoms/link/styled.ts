import styled from 'styled-components'
import Link from 'next/link'

export const StyledLink = styled(Link).attrs<{
  color: string
  hoverColor: string
}>(({ color, hoverColor }) => ({
  as: 'a',
  color,
  hoverColor,
}))<{ color: string; hoverColor: string }>`
  color: ${({ color }) => color};
  padding: 0;
  text-decoration: none;
  text-align: center;

  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`
