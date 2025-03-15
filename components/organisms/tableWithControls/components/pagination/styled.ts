import styled from 'styled-components'

export const OuterContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  width: 100%;
`
export const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  padding: 8px;
  border-radius: 3px;
`
