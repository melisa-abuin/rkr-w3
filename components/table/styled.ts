import styled from 'styled-components'

export const Container = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  margin-top: 80px;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  caption {
    text-align: left;
    padding: 10px;
    font-weight: bold;
  }
`

export const StyledTh = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
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
  text-align: left;
`

export const Title = styled.caption`
  font-size: var(--font-size-md-lg);
  font-weight: bold;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 3rem;
`
