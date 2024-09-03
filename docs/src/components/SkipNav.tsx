import type {
  SkipNavLinkProps } from '@reach/skip-nav'
import {
  SkipNavContent as ReachSkipNavContent,
  SkipNavLink as ReachSkipNavLink,
} from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'
import { Box } from '@ensdomains/thorin'

const Container = (props: React.PropsWithChildren<SkipNavLinkProps>) => (
  <Box
    as={ReachSkipNavLink}
    {...props}
    backgroundColor="accent"
    color="$background"
    fontFamily="$sans"
  />
)

export const SkipNavLink = ({ children, ...rest }: SkipNavLinkProps) => {
  return <Container {...rest}>{children}</Container>
}

export const SkipNavContent = ReachSkipNavContent
