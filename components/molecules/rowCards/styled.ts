import styled from 'styled-components'

export const Card = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  width: 100%;

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`
export const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
`
export const RowContainer = styled.div`
  align-items: center;

  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 16px;
`
