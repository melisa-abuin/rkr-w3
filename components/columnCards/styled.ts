import styled, { css } from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.background.quaternary};
  padding: 4px 8px;
`

export const Header = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.text.tertiary};
  display: flex;
  font-weight: var(--font-weight-bold);
  justify-content: center;
  min-height: 90px;
  padding: 20px;
  text-align: center;
  width: 100%;
`

export const Table = styled.table`
  width: 100%;
  font-size: var(--font-size-xs);
  border-collapse: separate;
  border-spacing: 0 4px;

  td:first-child {
    font-weight: var(--font-weight-bold);
  }
`

export const Td = styled.td`
  text-align: center;
  padding: 10px;
  position: relative;
  background-color: ${({ theme }) => theme.background.highlightTertiary};
  color: ${({ theme }) => theme.text.primary};

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`

export const DefaultCell = styled(Td)`
  opacity: 1;
  transform: scale(1);
`

export const HoverCell = styled(Td)`
  opacity: 0;
  transform: scale(0.9);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

export const Tr = styled.tr<{ hoverable: boolean }>`
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
      &:hover ${DefaultCell} {
        opacity: 0;
        transform: scale(0.9);
        pointer-events: none; /* Prevent interaction with hidden cells */
      }

      &:hover ${HoverCell} {
        opacity: 1;
        transform: scale(1);
      }
    `};
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  width: 100%;
`
