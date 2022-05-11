import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import styled from 'styled-components'

import {
  Button,
  LogoSVG,
  MenuSVG,
  Space,
  Typography,
  largerThan,
} from '@ensdomains/thorin'

import { createGitHubLink } from '~/utils/github'
import { createPlayroomLink } from '~/utils/playroom'
import { useIsMounted } from '~/utils/isMounted'
import { Link } from './Link'

type Link = { name: string; route: string }

export type Props = {
  links: { name: string; links: Link[] }[]
}

type State = {
  open: boolean
}

const initialState = {
  open: false,
}

const Container = styled.div`
  flex-direction: column;
  height: ${({ theme }) => theme.space['full']};
`

const ContainerInner = styled.div`
  ${({ theme }) => [
    `
    `,

    largerThan.md`
      padding-bottom: ${theme.space['6']};
    `,
  ]}
`

const NavlinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space['5']};
`

const NavLinkInner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: ${({ theme }) => theme.space['4']};
`

const ENSText = styled(Typography)`
  ${({ theme }) => `
      color: ${theme.colors.blue};
      font-size: ${theme.fontSizes['headingThree']};
      font-weight: ${theme.fontWeights['semiBold']};
  `}
`

const ButtonContainer = styled.div`
  ${largerThan.md`
    display: none;
  `}
`

const List = styled.div<{ open?: boolean }>`
  ${({ open, theme }) => `
    display: ${open ? 'block' : 'none'};
    height: ${theme.space['full']};
    padding-top: ${theme.space['10']};
  `}
  ${({ theme }) => largerThan.md`
    display: block;
    margin-bottom: ${theme.space['24']};
    padding-bottom: ${theme.space['24']};
    padding-top: 0;
  `}
`

const FlexContainer = styled.div<{ space?: Space }>`
  ${({ space, theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.space[space ?? '4']};
  `}
`

export const Nav = ({ links }: Props) => {
  const isMounted = useIsMounted()
  const router = useRouter()
  const [state, setState] = React.useState<State>(initialState)

  // Close menu on route change
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const handleRouteChange = () => setState((x) => ({ ...x, open: false }))
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Container>
      <ContainerInner>
        <NavlinkContainer>
          <NavLink active={router.asPath === '/'} href="/">
            <NavLinkInner>
              <LogoSVG height={48} width={48} />
              <ENSText>ENS</ENSText>
            </NavLinkInner>
          </NavLink>

          <ButtonContainer>
            <Button
              pressed={state.open}
              shadowless
              size="extraSmall"
              variant="transparent"
              onClick={() => setState((x) => ({ ...x, open: !x.open }))}
            >
              <div
                aria-label={state.open ? 'Close menu' : 'Open menu'}
                style={{ height: 24 }}
              >
                <MenuSVG alt="Menu" height={24} width={24} />
              </div>
            </Button>
          </ButtonContainer>
        </NavlinkContainer>
      </ContainerInner>

      <List open={!!state.open} style={{ overflow: 'scroll' }}>
        <FlexContainer space="6">
          <FlexContainer space="3">
            <NavLink href={createGitHubLink()}>GitHub</NavLink>
            <NavLink href={createPlayroomLink()}>Playroom</NavLink>
          </FlexContainer>

          <FlexContainer>
            <Typography variant="labelHeading" weight="bold">
              Guides
            </Typography>
            <FlexContainer space="3">
              <NavLink
                active={
                  isMounted &&
                  router.asPath.split('#')[0] === '/guides/development'
                }
                href="/guides/development"
              >
                Development
              </NavLink>
              <NavLink
                active={
                  isMounted &&
                  router.asPath.split('#')[0] === '/guides/playroom'
                }
                href="/guides/playroom"
              >
                Playroom
              </NavLink>
            </FlexContainer>
          </FlexContainer>

          <FlexContainer>
            <Typography variant="labelHeading" weight="bold">
              Components
            </Typography>
            {links.map((x) => (
              <FlexContainer key={x.name} space="3">
                <Typography variant="label">{x.name}</Typography>
                <FlexContainer space="3">
                  {x.links.map((y) => (
                    <NavLink
                      active={
                        isMounted && router.asPath.split('#')[0] === y.route
                      }
                      href={y.route}
                      key={y.route}
                    >
                      {y.name}
                    </NavLink>
                  ))}
                </FlexContainer>
              </FlexContainer>
            ))}
          </FlexContainer>
        </FlexContainer>
      </List>
    </Container>
  )
}

const HeaderLink = styled.div`
  transition: all 0.15s ease-in-out;
  width: ${({ theme }) => theme.space['max']};
  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  & a {
    text-decoration: none;
  }
`

const NavLinkChildrenContainer = styled(Typography)<{ active?: boolean }>`
  ${({ active, theme }) => `
  font-weight: ${theme.fontWeights['semiBold']};

  color: ${active ? theme.colors.accent : theme.colors.textTertiary};
  `}
`

const NavLink = ({
  active,
  href,
  children,
}: React.PropsWithChildren<{
  active?: boolean
  href: string
}>) => {
  return (
    <HeaderLink>
      <Link href={href}>
        <NavLinkChildrenContainer {...{ active }}>
          {children}
        </NavLinkChildrenContainer>
      </Link>
    </HeaderLink>
  )
}
