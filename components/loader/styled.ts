import styled, { keyframes } from 'styled-components'

interface Props {
  height?: number | string
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
    ${({ theme }) => theme.background.quaternary} 8%,
    ${({ theme }) => theme.background.tertiary} 18%,
    ${({ theme }) => theme.background.quaternary} 33%
  );
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
`
