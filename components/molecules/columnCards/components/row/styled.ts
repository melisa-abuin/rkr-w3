import styled, { css } from 'styled-components'
import Link from 'next/link'

export const Td = styled.td`
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  color: ${({ theme }) => theme.text.primary};
  padding: 10px;
  position: relative;
  text-align: center;

  transition: opacity 0.1s ease;
`

export const BaseTd = styled(Td)`
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
  & td:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  & td:last-child {
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
  color: ${({ theme }) => theme.text.primary};
  text-decoration: none;
  width: 100%;

  &:hover {
    color: ${({ theme }) => theme.text.highlight};
  }
`
