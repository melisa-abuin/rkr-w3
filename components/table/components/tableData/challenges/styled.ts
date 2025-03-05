import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 4px;
  margin-top: 10px;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  margin-bottom: 4px;
  margin-top: 10px;
`
