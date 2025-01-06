import Image from 'next/image'
import styled from 'styled-components'

export const CircleImage = styled(Image)<{ completed: boolean }>`
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  cursor: pointer;
  filter: ${({ completed }) => (completed ? 'none' : 'grayscale(1)')};
  opacity: ${({ completed }) => (completed ? '1' : '0.5')};
`
export const Header = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  color: ${({ theme }) => theme.text.tertiary};
  padding: 10px;
  font-weight: var(--font-weight-bold);
  text-align: center;
`
export const Body = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  padding: 20px;
`

export const Section = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`

export const Title = styled.p`
  color: ${({ theme }) => theme.text.secondary};
`
