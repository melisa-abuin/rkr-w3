import styled, { keyframes } from 'styled-components'

const slideDownFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -12px);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`

export const Container = styled.header`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 24px;
  width: 100%;
`

export const Badges = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1000px;
  text-align: left;
  width: 100%;
  & div {
    margin: 8px 0;
  }
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
`

export const FloatingTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-md);
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${slideDownFadeIn} 0.25s ease-out;
  background-color: ${({ theme }) => theme.background.primary};
  width: calc(100% - 48px);
  max-width: 1000px;
  padding: 16px 0 16px 0;
  margin: 0;
  pointer-events: none;
  z-index: 2;
`
