import styled from 'styled-components'
import { PositionCardVariant } from './index'

export const Card = styled.div<{ $variant: PositionCardVariant }>`
  align-items: center;
  background-color: ${({ theme, $variant }) =>
    $variant === 'highlight'
      ? theme.background.highlightPrimary
      : theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
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
  align-items: center;
  white-space: nowrap;

  @media (max-width: 480px) {
    width: 100%;
  }
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

export const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 100%;
  }
`
