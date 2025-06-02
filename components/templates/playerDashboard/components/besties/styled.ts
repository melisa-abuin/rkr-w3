import styled from 'styled-components'

export const Container = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 3px;
  color: ${({ theme }) => theme.text.color.primary};
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  padding: 16px;
  width: 100%;
`

export const Description = styled.p`
  color: ${({ theme }) => theme.text.color.secondary};
  margin: 0;
  font-size: var(--font-size-xs);
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`
