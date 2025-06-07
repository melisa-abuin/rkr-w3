import styled, { css } from 'styled-components'
import { NavLink } from './components/desktop/styled'

interface NavProps {
  hasTransparentStyle?: boolean
}

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
`

export const StyledNav = styled.nav<NavProps>`
  align-items: center;
  background: ${({ hasTransparentStyle, theme }) =>
    hasTransparentStyle ? 'transparent' : theme.background.primary};
  box-shadow: ${({ hasTransparentStyle, theme }) =>
    hasTransparentStyle ? 'none' : `0 4px 6px ${theme.shadow.primary}`};

  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 16px 24px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;

  a {
    color: ${({ hasTransparentStyle, theme }) =>
      hasTransparentStyle ? theme.text.white : theme.text.primary};
  }

  ${NavLink} {
    ${({ hasTransparentStyle, theme }) =>
      hasTransparentStyle &&
      css`
        border-bottom-color: ${theme.text.white};
      `}
  }
`
export const Event = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-xs-sm);
  padding: 16px 24px;
  top: 90px;
  text-align: center;
  width: 100%;
  position: fixed;
  z-index: 2;
`
