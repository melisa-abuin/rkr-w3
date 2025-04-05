import styled, { css } from 'styled-components'
import Link from 'next/link'

export const TdWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Td = styled.span`
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  color: ${({ theme }) => theme.text.primary};
  padding: 10px;
  position: relative;
  text-align: center;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);

  transition: opacity 0.1s ease;
`

export const BaseTd = styled(Td)<{ shouldFill?: boolean }>`
  flex: ${({ shouldFill }) => (shouldFill ? '1' : 'none')};
  opacity: 1;
`

export const HoverTd = styled(Td)`
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const Tr = styled.tr<{ hoverable?: boolean }>`
  & span:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    font-weight: var(--font-weight-bold);
  }
  & span:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  position: relative;

  ${({ hoverable }) =>
    hoverable &&
    css`
      cursor: pointer;
      &:hover ${BaseTd}, &:active ${BaseTd} {
        opacity: 0;
        pointer-events: none;
      }

      &:hover ${HoverTd}, &:active ${HoverTd} {
        opacity: 1;
      }
    `};
`
export const LinkWrapper = styled(Link)`
  display: block;
  text-decoration: none;
  width: 100%;
`
