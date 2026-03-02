import styled from 'styled-components'

export const Card = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;

  flex: 0 0 100%;
  width: 100%;

  @media (max-width: 480px) {
    align-items: center;
    flex-direction: row;
    flex: 0 0 100%;
    flex-wrap: nowrap;
    width: 100%;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
`

export const RowContainer = styled.div`
  align-items: center;

  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 16px;

  @media (max-width: 480px) {
    width: auto;
    & div:first-child {
      height: 48px;
      width: 48px;
    }
  }
`
export const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;

  @media (max-width: 480px) {
    width: auto;
    & > *:not(:first-child) {
      display: none;
    }
  }
`
