import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  a {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    margin-top: 10px;
    margin-bottom 4px;
  }
`

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semi-bold);
  margin-top: 10px;
  margin-bottom: 4px;
`
