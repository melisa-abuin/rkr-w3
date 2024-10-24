import styled from 'styled-components'

export const Header = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  padding-top: 6rem;
`

export const Info = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs-sm);
  margin-bottom: 4rem;

  max-width: 1000px;
  text-align: center;
  width: 100%;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
`
