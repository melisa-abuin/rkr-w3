import styled from 'styled-components'

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  padding-bottom: 2rem;
`

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  margin: 0 4px;
  border: ${({ active, theme }) =>
    active ? 'none' : `1px solid ${theme.color.primary}`};
  border-radius: 4px;
  background-color: ${({ active, theme }) =>
    active ? theme.color.primary : theme.background.primary};
  color: ${({ active, theme }) =>
    active ? theme.text.white : theme.color.primary};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
