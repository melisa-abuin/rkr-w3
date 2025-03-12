import styled from 'styled-components'

export const Colored = styled.span`
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.color.secondary};
`

export const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  gap: 1.8rem;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Column = styled.div`
  flex: 1;
  text-align: center;
`

export const ColumnTitle = styled.h3`
  font-size: var(--font-size-sm-md);
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 1rem;
`

export const ColumnText = styled.p`
  font-size: var(--font-size-xs-sm);
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.5;
`
