import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 16px;
  text-align: center;
  width: 100%;
`

export const Date = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
`

export const DetailContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding-left: 20px;
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
  color: ${({ theme }) => theme.text.secondary};
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`

export const Info = styled(Wrapper)`
  gap: 16px;
  padding-bottom: 16px;
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
