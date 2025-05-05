import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
`

export const BarBackground = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.background.quaternary};
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
`

export const BarFill = styled.div`
  background-color: ${({ theme }) => theme.background.purple};
  height: 100%;
  transition: width 0.6s ease;
`

export const Label = styled.div`
  color: ${({ theme }) => theme.text.color.primary};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs-sm);
  font-weight: var(--font-weight-semi-bold);
`
