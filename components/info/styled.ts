import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  padding: 1rem;
  padding-top: 6rem;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs-sm);
  max-width: 1000px;
  text-align: center;
  width: 100%;
`
