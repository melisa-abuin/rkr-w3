import styled from 'styled-components'

export const StyledTooltip = styled.div<{
  x: number
  y: number
  showTooltip: boolean
}>`
  opacity: ${({ showTooltip }) => (showTooltip ? '1' : '0')};
  pointer-events: ${({ showTooltip }) => (showTooltip ? 'auto' : 'none')};
  transform: ${({ showTooltip }) =>
    `translate(-50%, 24px) ${showTooltip ? 'scale(1)' : 'scale(0.95)'}`};

  background-color: ${({ theme }) => theme.background.primary};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs);
  left: ${({ x }) => x}px;
  padding: 8px;
  position: fixed;
  text-align: left;
  top: ${({ y }) => y}px;
  z-index: 10;
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out;
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow.primary};
`

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`
