import styled from 'styled-components'

export const Container = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  @media (max-width: 480px) {
    align-items: flex-start;
    overflow-x: auto;
  }
`

export const StyledTable = styled.table`
  max-width: 1000px;

  width: 100%;
  border-collapse: separate;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-spacing: 0;

  padding: 16px;
  & tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.background.highlightPrimary};
  }

  & th:first-child {
    min-width: 140px;
  }

  caption {
    text-align: left;
    padding: 16px 0;
    font-weight: var(--font-weight-bold);
  }
`

export const StyledTh = styled.th<{
  hasActions: boolean
  highlighted: boolean
}>`
  border-bottom: ${({ highlighted, theme }) =>
    highlighted ? `1px solid ${theme.text.tertiary}` : 'none'};
  background-color: ${({ theme }) => theme.background.quaternary};
  cursor: ${({ hasActions }) => (hasActions ? 'pointer' : 'auto')};
  font-weight: var(--font-weight-bold);
  padding: 10px;
  text-align: center;
  transition: background-color 1s;
`

export const StyledTr = styled.tr`
  border: none;
  color: ${({ theme }) => theme.text.tertiary};
  border-radius: 10px;
`

export const StyledTd = styled.td<{
  highlighted?: boolean
  index?: number
}>`
  background-color: ${({ highlighted, theme, index = 0 }) =>
    highlighted
      ? index % 2 !== 0
        ? theme.background.highlightSecondary
        : theme.background.highlightTertiary
      : 'inherit'};

  border: none;
  color: ${({ theme }) => theme.text.primary};
  padding: 10px;
  text-align: center;
  transition: background-color 1s;
`

export const Title = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  font-size: var(--font-size-md);
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;

  a {
    color: ${({ theme }) => theme.text.secondary};
    font-size: var(--font-size-sm);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
