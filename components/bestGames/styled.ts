import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`

export const DesktopCardContainer = styled.div`
  display: block;
  width: 100%;

  @media (max-width: 480px) {
    display: none;
  }
`

export const MobileCardContainer = styled.div`
  display: none;
  width: 100%;

  @media (max-width: 480px) {
    display: block;
  }
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`
