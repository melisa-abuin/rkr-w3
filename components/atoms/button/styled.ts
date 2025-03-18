import styled from 'styled-components'

export const StyledButton = styled.button<{
  color: string
  highlightColor: string
  small: boolean
  variant: 'primary' | 'secondary'
}>`
  padding: ${({ small }) => (small ? '4px 8px' : '8px 12px')};
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  background-color: ${({ variant, color }) =>
    variant === 'primary' ? color : 'transparent'};
  color: ${({ variant, theme, color }) =>
    variant === 'primary' ? theme.text.white : color};
  cursor: pointer;
  font-weight: ${({ small }) =>
    small ? 'var(--font-weight-regular)' : 'var(--font-weight-semi-bold)'};
  font-size: ${({ small }) =>
    small ? 'var(--font-size-xs)' : 'var(--font-size-xs-md)'};

  &:hover {
    background-color: ${({ variant, color, highlightColor }) =>
      variant === 'primary' ? highlightColor : color};
    color: ${({ theme }) => theme.text.white};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`
