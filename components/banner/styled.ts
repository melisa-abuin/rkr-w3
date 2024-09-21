import styled from 'styled-components'

export const BannerContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  height: 600px;
  background: ${({ theme }) => `
    linear-gradient(
      180deg,
      ${theme.color.primary} 0%,
      ${theme.color.black} 100%
      )
  `};
  color: ${({ theme }) => theme.text.white};
`

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`

export const DiscordDetail = styled.small`
  font-size: var(--font-size-body-small);
  font-weight: var(--font-size-weight-small);
`

export const Title = styled.h1`
  font-size: var(--font-size-h1);
  margin-bottom: 1rem;
`

export const Info = styled.p`
  font-size: var(--font-size-body-large);
  margin-bottom: 2rem;
`
// TODO: make this a button component
export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`

export const Colored = styled.span`
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.color.secondary};
`