import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const Card = styled.div`
  border-radius: 3px;
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow.primary};
  width: 100%;
  overflow: hidden;
`

export const Header = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.text.white};
  display: flex;
  justify-content: center;
  min-height: 90px;
  padding: 20px;
  text-align: center;
  width: 100%;
`

export const Table = styled.table`
  width: 100%;
  font-size: var(--font-size-xs);
  border-collapse: collapse;

  td:first-child {
    font-weight: var(--font-weight-bold);
  }
`

export const Td = styled.td`
  text-align: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.background.quaternary};
  color: ${({ theme }) => theme.text.primary};
`

export const Section = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: 2rem;
`
