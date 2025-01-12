import styled from 'styled-components'

export const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
`
export const OuterContainer = styled.section<{ marginTop: number }>`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  width: 100%;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`
