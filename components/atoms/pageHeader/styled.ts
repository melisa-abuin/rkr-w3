import styled from 'styled-components'

export const Header = styled.header<{ align: 'center' | 'flex-start' }>`
  align-items: ${({ align }) => align};
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 24px 0 24px;
  width: 100%;
`

export const Info = styled.p<{ align: 'center' | 'flex-start' }>`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs-sm);
  margin-bottom: 2rem;

  max-width: 1000px;
  text-align: ${({ align }) => (align === 'flex-start' ? 'left' : 'center')};
  width: 100%;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
`
