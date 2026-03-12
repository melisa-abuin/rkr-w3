import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
`

export const CenterBox = styled.div<{ withPadding: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex: 1;
  justify-content: center;
  min-width: 250px;
  overflow: hidden;
  position: relative;
  padding: ${({ withPadding }) => (withPadding ? '2px' : '0')};
`

export const AnimatedBorderBox = styled.div`
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 0;

  &::before {
    content: '';
    height: 99999px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 99999px;
    z-index: -2;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(255, 0, 0, 0),
      ${({ theme }) => theme.color.primary},
      rgba(0, 0, 0, 0) 25%
    );
    animation: ${rotate} 3s linear infinite;
  }

  &::after {
    border-radius: 3px;
    content: '';
    height: calc(100% - 4px);
    left: 2px;
    position: absolute;
    top: 2px;
    width: calc(100% - 4px);
    z-index: -1;
  }
`

export const AnimatedBorderBoxGlow = styled(AnimatedBorderBox)`
  filter: blur(50px);
  z-index: 1;
`

export const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 3px;
  color: ${({ theme }) => theme.text.color.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 16px;
  width: 100%;
  z-index: 1;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.text.color.primary};
  font-size: var(--font-size-sm-md);
  font-weight: var(--font-weight-bold);
  text-transform: capitalize;
  margin: 0;
`
export const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 16px 0;
  justify-content: space-around;
  width: 100%;
`
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  p {
    margin: 0;
  }
`
