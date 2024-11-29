import styled from 'styled-components'

export const Badge = styled.span<{ selected: boolean }>`
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.text.tertiary : theme.text.secondary};
  border-radius: 3px;
  color: ${({ theme, selected }) =>
    selected ? theme.text.tertiary : theme.text.secondary};
  cursor: pointer;
  font-weight: var(--font-weight-semi-bold);
  font-size: var(--font-size-xs);
  padding: 5px 10px;
`

export const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
  margin-bottom: 5px;
`
