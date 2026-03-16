import styled from 'styled-components'

export const DesktopOnly = styled.div`
  overflow: hidden;
  text-align: center;
  width: 100%;

  @media (max-width: 480px) {
    display: none;
  }
`

export const Date = styled.span`
  color: ${({ theme }) => theme.text.color.secondary};
  font-size: var(--font-size-xs);
`

export const DetailContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  gap: 16px;
`

export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  width: 100%;
`

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.text.color.secondary};
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`

export const Info = styled(Wrapper)`
  gap: 16px;
`

export const IconButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
`
