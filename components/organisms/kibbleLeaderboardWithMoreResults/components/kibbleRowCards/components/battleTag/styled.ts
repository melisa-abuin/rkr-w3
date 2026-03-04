import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 16px;
`

export const ImageContainer = styled.div`
  @media (max-width: 480px) {
    display: none;
  }
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  a {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    margin-top: 10px;
    text-align: left;
  }
`

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semi-bold);
  margin-top: 10px;
  margin-bottom: 4px;
`
