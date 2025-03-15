import styled from 'styled-components'

export const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  background-color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.color.primary : 'transparent'};
  color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.text.white : theme.color.primary};
  cursor: pointer;

  font-weight: var(--font-weight-semi-bold);
  font-size: var(--font-size-xs-md);

  &:hover {
    background-color: ${({ variant, theme }) =>
      variant === 'primary' ? theme.text.tertiary : theme.color.primary};
    color: ${({ variant, theme }) =>
      variant === 'primary' ? theme.text.white : theme.text.white};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`
