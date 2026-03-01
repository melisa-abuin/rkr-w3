import styled from 'styled-components'

export const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

export const Podium = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex: 0 0 calc(50% - 8px);
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  width: calc(50% - 8px);

  &:first-child {
    flex: 0 0 100%;
    width: 100%;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
    flex: 0 0 100%;
    width: 100%;
  }
`

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
    width: 100%;
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
    width: 100%;
  }
`
