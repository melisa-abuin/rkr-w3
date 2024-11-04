import styled from 'styled-components'

export const Container = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 2rem;
  overflow-x: auto;

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`

export const StyledTable = styled.table`
  max-width: 1000px;
  width: 100%;
  border-collapse: collapse;

  & tr:nth-child(even) {
    background-color: ${({ theme }) => theme.background.quaternary};
  }

  caption {
    text-align: left;
    padding: 10px;
    font-weight: var(--font-weight-bold);
  }
`

export const StyledTh = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: var(--font-weight-bold);
  text-align: center;
`

export const StyledTr = styled.tr`
  border: none;
  background-color: ${({ theme }) => theme.background.tertiary};
  color: ${({ theme }) => theme.color.primary};
  border-radius: 10px;
`

export const StyledTd = styled.td`
  border: none;
  color: ${({ theme }) => theme.text.primary};
  padding: 10px;
  text-align: center;
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
