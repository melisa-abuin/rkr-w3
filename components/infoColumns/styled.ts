import styled from 'styled-components'

export const Colored = styled.span`
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.color.secondary};
`

export const ColumnsContainer = styled.section`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ColumnsTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 3rem;
`

export const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 1rem;
`

export const ColumnText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.5;
`
