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
      #441111 100%
      )
  `};
  color: ${({ theme }) => theme.text.white};

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;

  @media (max-width: 480px) {
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;
  }
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const DiscordDetail = styled.small`
  display: inline;
  font-size: var(--font-size-body-small);
  font-weight: var(--font-size-weight-small);

  @media (max-width: 480px) {
    display: none;
  }
`

export const Title = styled.h1`
  font-size: var(--font-size-h1);
  margin-bottom: 1rem;
`

export const Info = styled.p`
  font-size: var(--font-size-body-large);
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    display: none;
  }
`

export const Colored = styled.span`
  font-weight: var(--font-weight-semi-bold);
  color: ${({ theme }) => theme.color.secondary};
`
