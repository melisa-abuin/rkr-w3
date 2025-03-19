import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideInDesktop = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideInMobile = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Body = styled.div`
  padding: 8px 24px 24px 24px;
  flex: 1;
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
`

export const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.shadow.secondary};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;
  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
`

export const Content = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.color.tertiary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  z-index: 3;

  opacity: 0;
  animation: ${slideInDesktop} 0.3s forwards;

  @media (max-width: 480px) {
    border: none;
    border-radius: 0;
    height: 100%;
    width: 100%;
    animation: ${slideInMobile} 0.3s forwards;
  }
`

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  width: 100%;
`
