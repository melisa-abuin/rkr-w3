import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  a {
    font-size: var(--font-size-xs-sm);
    font-weight: var(--font-weight-semi-bold);
    margin-bottom: 4px;
    text-align: left;
  }
`

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  margin-top: 4px;
  margin-bottom: 0px;
`
