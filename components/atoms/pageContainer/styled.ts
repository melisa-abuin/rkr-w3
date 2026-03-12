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
  withPadding: boolean
}>`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  padding: ${({ withPadding }) => (withPadding ? '0 24px' : '0')};
  width: 100%;
`

export const Title = styled.h2<{ align: 'center' | 'left' }>`
  color: ${({ theme }) => theme.text.primary};
  text-align: ${({ align }) => align};
  text-transform: capitalize;
  width: 100%;
`
