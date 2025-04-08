import styled from 'styled-components'

export const StyledTooltip = styled.div`
  opacity: 0;
  pointer-events: none;
  width: 150px;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  text-align: left;
  border-radius: 4px;
  padding: 8px;
  position: absolute;
  z-index: 10;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out;
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow.primary};

  table {
    width: 100%;
    font-size: var(--font-size-xs);
    border-collapse: collapse;

    td {
      padding: 4px;
      background-color: ${({ theme }) => theme.background.primary};
    }

    td:first-child {
      font-weight: var(--font-weight-bold);
    }
  }
`

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover ${StyledTooltip} {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) scale(1);
  }
`
