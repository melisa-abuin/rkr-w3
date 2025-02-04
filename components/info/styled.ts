import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  justify-content: center;
  padding: 1rem;
  padding-top: 2rem;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs-sm);
  max-width: 1000px;
  text-align: left;
  width: 100%;
`
