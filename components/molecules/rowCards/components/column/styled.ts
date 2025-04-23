import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  justify-content: flex-start;
  text-align: center;
`
export const Description = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-regular);
`
export const Title = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  margin: 0;
  padding: 0;
`
