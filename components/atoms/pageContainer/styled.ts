import styled from 'styled-components'

export const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
`
export const OuterContainer = styled.section<{
  marginTop: number
  marginBottom: number
}>`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  width: 100%;
  padding: 0 24px;
`

export const Title = styled.h2<{ align: 'center' | 'left' }>`
  color: ${({ theme }) => theme.text.primary};
  text-align: ${({ align }) => align};
  text-transform: capitalize;
  width: 100%;
`
