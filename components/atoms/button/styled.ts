import styled, { css } from 'styled-components'

export const StyledButton = styled.button<{
  color: string
  background: string
  hoverBackground: string
  hoverColor: string
  small: boolean
  variant?: 'outline' | 'solid' | 'ghost'
}>`
  padding: ${({ small }) => (small ? '4px 8px' : '8px 12px')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${({ hoverBackground }) => hoverBackground};
    color: ${({ hoverColor }) => hoverColor};
  }

  ${({ variant, background, color }) =>
    variant === 'outline' &&
    css`
      background-color: transparent;
      border: 1px solid ${background};
      color: ${background};
      &:hover {
        background-color: ${background};
        color: ${color};
      }
    `};

  ${({ variant, background, color }) =>
    variant === 'ghost' &&
    css`
      background-color: transparent;
      color: ${background};
      &:hover {
        background-color: ${background};
        color: ${color};
      }
    `};

  font-weight: ${({ small }) =>
    small ? 'var(--font-weight-regular)' : 'var(--font-weight-semi-bold)'};
  font-size: ${({ small }) =>
    small ? 'var(--font-size-xs)' : 'var(--font-size-xs-sm)'};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.9;
  }
`
