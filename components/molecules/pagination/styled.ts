import styled from 'styled-components'

export const OuterContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  padding-top: 16px;
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

export const DesktopButtonContainer = styled.div`
  display: block;
  @media (max-width: 480px) {
    display: none;
  }
`

export const MobileButtonContainer = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
`
