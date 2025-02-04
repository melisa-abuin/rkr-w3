import styled from 'styled-components'

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text.tertiary};
  cursor: pointer;
  font-size: var(--font-size-xs-sm);
  padding: 0;
`
