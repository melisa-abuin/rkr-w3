import { ToastVariant } from '@/interfaces/toast'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Container = styled.div<{ variant?: ToastVariant }>`
  align-items: center;
  border-radius: 3px;
  background-color: ${({ theme, variant }) =>
    variant === 'warning' ? theme.background.warning : theme.background.error};
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow.primary};
  color: ${({ theme }) => theme.text.white};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;

  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
`

export const Message = styled.p`
  margin: 0;
  padding-right: 5px;
`

export const Wrapper = styled.div<{ index: number }>`
  align-items: center;
  bottom: ${({ index }) => `calc(${index} * 74px)`};
  display: flex;
  justify-content: center;
  padding: 24px;
  position: fixed;
  width: 100%;
  z-index: 2;

  @media (max-width: 480px) {
    padding: 16px;
  }
`
