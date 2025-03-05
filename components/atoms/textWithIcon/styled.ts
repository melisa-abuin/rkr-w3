import styled from 'styled-components'

export const Text = styled.span<{
  color: string
  large: boolean
}>`
  color: ${({ color }) => color};
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: ${({ large }) =>
    large ? 'var(--font-size-md)' : 'var(--font-size-sm)'};
  font-weight: var(--font-weight-semi-bold);
  gap: 8px;
  justify-content: center;
`
