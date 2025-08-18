import styled from 'styled-components'

export const BannerContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => `
    linear-gradient(66deg, ${theme.color.tertiary} 0%, ${theme.color.tertiary} 35%, ${theme.color.secondary} 100%);
  `};
  color: ${({ theme }) => theme.text.white};

  padding: 0 24px;
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  max-width: 1000px;
  width: 100%;
`

export const DiscordDetail = styled.small`
  display: inline;
  font-size: var(--font-size-xs);
  font-weight: var(--font-size-weight-small);

  @media (max-width: 480px) {
    display: none;
  }
`

export const Title = styled.h1`
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
`

export const Info = styled.p`
  font-size: var(--font-size-xs-sm);
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    display: none;
  }
`

export const Colored = styled.span`
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.color.secondary};
`
export const Subtitle = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  font-size: var(--font-size-sm);
  margin-bottom: 8px;
`
