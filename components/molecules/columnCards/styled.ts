import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`

export const Card = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 180px;
  overflow: hidden;
  padding: 4px 8px;
  text-align: center;

  @media (max-width: 1000px) {
    flex: 1 1 calc(100% / 3 - 10px);
  }
`

export const Header = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text.tertiary};
  display: flex;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  justify-content: center;
  min-height: 90px;
  padding: 20px;
  text-align: center;
  width: 100%;
`

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 4px;
  font-size: var(--font-size-xs);
  width: 100%;

  td:first-child {
    font-weight: var(--font-weight-bold);
  }
`

export const Footer = styled.div`
  align-items: center;
  display: flex;
  font-size: var(--font-size-xs);
  justify-content: center;
  margin: 8px 0;
  text-align: center;
`
