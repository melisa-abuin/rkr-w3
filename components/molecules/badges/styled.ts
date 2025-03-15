import styled from 'styled-components'

export const OuterContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: flex-start;
  width: 100%;
`
export const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.background.quaternary};
  padding: 8px;
  border-radius: 3px;
`
