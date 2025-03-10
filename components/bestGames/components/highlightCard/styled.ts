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

export const Name = styled.span`
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  color: ${({ theme }) => theme.text.primary};
  padding: 10px;
  font-size: var(--font-size-xs);
`

export const DetailContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  padding-left: 20px;
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
`
