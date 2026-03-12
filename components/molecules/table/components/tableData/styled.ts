import styled from 'styled-components'

export const Column = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Title = styled.p`
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-sm);
  color: ${({ theme }) => theme.text.color.primary};
  text-align: center;
  margin: 0;
`
export const Subtitle = styled.p`
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-xs);
  color: ${({ theme }) => theme.text.color.secondary};
  text-align: center;
  margin: 0;
`
