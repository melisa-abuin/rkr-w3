import styled, { css } from 'styled-components'

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

  a {
    display: block;
    height: 100%;
    width: 100%;
  }
`

export const Tr = styled.tr<{ hoverable?: boolean }>`
  & td:first-child {
    max-width: 110px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
