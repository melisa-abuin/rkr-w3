import styled from 'styled-components'

export const Card = styled.div`
  flex: 0 0 100%;
  width: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
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
