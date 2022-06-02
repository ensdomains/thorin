import styled, { css } from 'styled-components'
import {
  SkipNavContent as ReachSkipNavContent,
  SkipNavLink as ReachSkipNavLink,
  SkipNavLinkProps,
} from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

const Container = styled(ReachSkipNavLink)(
  ({ theme }) => css`
    background: ${theme.colors.accent};
    color: ${theme.colors.accentText};
    font-family: ${theme.fonts['sans']};
  `,
)

export const SkipNavLink = ({ children, ...rest }: SkipNavLinkProps) => {
  return <Container {...rest}>{children}</Container>
}

export const SkipNavContent = ReachSkipNavContent
