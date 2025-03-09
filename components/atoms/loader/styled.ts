import styled, { keyframes } from 'styled-components'

interface Props {
  height?: number | string
  variant?: 'primary' | 'secondary'
  width?: number | string
}

const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`

export const Background = styled.div<Props>`
  background: linear-gradient(
    110deg,
    ${({ theme, variant }) =>
        variant === 'primary'
          ? theme.background.quaternary
          : theme.background.highlightSecondary}
      8%,
    ${({ theme }) => theme.background.highlightTertiary} 18%,
    ${({ theme, variant }) =>
        variant === 'primary'
          ? theme.background.quaternary
          : theme.background.highlightSecondary}
      33%
  );
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
`
