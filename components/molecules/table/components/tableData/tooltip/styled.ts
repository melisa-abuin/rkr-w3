import styled from 'styled-components'

export const StyledTooltip = styled.div`
  visibility: hidden;
  display: none;
  width: 150px;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.primary};
  text-align: left;
  border-radius: 4px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  transform: translateY(50%);
  left: 150%;
  opacity: 0;
  transition: opacity 0.3s ease;
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
    visibility: visible;
    opacity: 1;
    display: inline;
  }
`
