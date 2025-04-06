import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`
export const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2px;
  min-width: 200px;
`

export const BorderContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgb(245, 17, 17),
    transparent 25%
  );
  animation: ${rotate} 4s linear infinite;
  filter: blur(8px);
`

export const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.quaternary};
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  padding: 20px;
`
