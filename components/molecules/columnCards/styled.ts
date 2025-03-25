import styled, { css } from 'styled-components'
import Link from 'next/link'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`

export const Card = styled.div`
  background-color: ${({ theme }) => theme.background.quaternary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 180px;
  overflow: hidden;
  padding: 4px 8px;
  text-align: center;

  @media (max-width: 1000px) {
    flex: 1 1 calc(100% / 3 - 10px);
  }
`

export const Header = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text.tertiary};
  display: flex;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  justify-content: center;
  min-height: 90px;
  padding: 20px;
  text-align: center;
  width: 100%;
`

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 4px;
  font-size: var(--font-size-xs);
  width: 100%;

  td:first-child {
    font-weight: var(--font-weight-bold);
  }
`

export const Td = styled.td`
  background-color: ${({ theme }) => theme.background.highlightPrimary};
  color: ${({ theme }) => theme.text.primary};
  padding: 10px;
  position: relative;
  text-align: center;

  transition: opacity 0.1s ease;
`

export const DefaultCell = styled(Td)`
  opacity: 1;
`

export const HoverCell = styled(Td)`
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
      &:hover ${DefaultCell}, &:active ${DefaultCell} {
        opacity: 0;
        pointer-events: none;
      }

      &:hover ${HoverCell}, &:active ${HoverCell} {
        opacity: 1;
      }
    `};
`
export const Footer = styled(Link)`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
  margin: 8px 0;
  text-align: center;
  text-decoration: none;
`
