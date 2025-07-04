import styled from 'styled-components'

export const Badge = styled.span<{
  color: string
  background: string
}>`
  background-color: ${({ theme, background }) =>
    background || theme.color.primary};
  border-radius: 4px;
  font-size: var(--font-size-xs);
  color: ${({ theme, color }) => color || theme.text.primary};
  padding: 6px 8px;
  text-transform: capitalize;
`
