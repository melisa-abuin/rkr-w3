import { IToastVariant } from '@/interfaces/toast/index'
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

export const Container = styled.div<{ variant?: IToastVariant }>`
  align-items: center;
  border-radius: 3px;
  background-color: ${({ theme, variant }) =>
    variant === 'warning' ? theme.background.warning : theme.background.error};
  box-shadow: ${({ theme }) => theme.shadow.primary};
  color: ${({ theme }) => theme.text.white};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;

  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
`

export const Message = styled.p`
  padding-right: 5px;
`

export const Wrapper = styled.div<{ index: number }>`
  align-items: center;
  bottom: ${({ index }) => `calc(${index} * 74px)`};
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  z-index: 2;
`
