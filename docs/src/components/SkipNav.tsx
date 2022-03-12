import styled from 'styled-components'
import {
  SkipNavContent as ReachSkipNavContent,
  SkipNavLink as ReachSkipNavLink,
  SkipNavLinkProps,
} from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

import { tokens } from '@ensdomains/thorin'

const Container = styled(ReachSkipNavLink)`
  ${({ theme }) => `
    background: ${tokens.colors[theme.mode].accent};
    color: ${tokens.colors[theme.mode].accentText};
    font-family: ${tokens.fonts['sans']};
  `}
`

export const SkipNavLink = ({ children, ...rest }: SkipNavLinkProps) => {
  return <Container {...rest}>{children}</Container>
}

export const SkipNavContent = ReachSkipNavContent
