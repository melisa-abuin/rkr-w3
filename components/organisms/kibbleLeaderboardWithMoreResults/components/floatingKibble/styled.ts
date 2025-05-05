import styled, { keyframes } from 'styled-components'

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
`

export const Container = styled.div<{ collapsed: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  padding: ${({ collapsed }) => (collapsed ? '0px' : '24px')};
  height: ${({ collapsed }) => (collapsed ? '48px' : '150px')};
  width: 100%;
  transition: height 0.4s ease;
`

export const ImageWrapper = styled.div`
  cursor: pointer;
  animation: ${float} 2s ease-in-out infinite;
  height: 64px;
`

export const Text = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs-sm);
  text-align: center;
`
