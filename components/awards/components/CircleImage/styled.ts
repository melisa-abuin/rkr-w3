import styled from 'styled-components'
import Image from 'next/image'

export const StyledImage = styled(Image)<{ completed: boolean }>`
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  cursor: pointer;
  filter: ${({ completed }) => (completed ? 'none' : 'grayscale(1)')};
  opacity: ${({ completed }) => (completed ? '1' : '0.5')};
`
