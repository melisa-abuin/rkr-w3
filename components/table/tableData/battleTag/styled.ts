import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.a`
  color: ${({ theme }) => theme.color.secondary};
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  margin-top: 10px;
  margin-bottom 2px;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.text.highlight};
  }
`

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semi-bold);
  margin-bottom: 10px;
`
