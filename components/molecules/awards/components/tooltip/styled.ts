import styled from 'styled-components'

export const Description = styled.p`
  font-size: var(--font-size-xs);
  color: ${({ theme }) => theme.text.secondary};
`

export const StyledTooltip = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.background.secondary};
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow.primary};
  color: ${({ theme }) => theme.text.primary};
  display: none;
  left: -100%;
  opacity: 0;
  padding: 8px;
  position: absolute;
  text-align: left;
  top: 100%;
  transition: opacity 0.3s ease;
  visibility: hidden;
  width: 200px;
  z-index: 1;
`
export const Title = styled.h3`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 8px 0;
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
