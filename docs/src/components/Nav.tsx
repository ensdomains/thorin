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
  tokens,
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
  height: ${tokens.space['full']};
`

const ContainerInner = styled.div`
  ${largerThan.lg`
    padding-bottom: ${tokens.space['5']};
  `}
`

const NavlinkContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: ${tokens.space['5']};

  ${largerThan.lg`
    flex-direction: column;
  `}
`

const NavLinkInner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: ${tokens.space['4']};
`

const ENSText = styled(Typography)`
  ${({ theme }) => `
      color: ${tokens.colors[theme.mode].blue};
      font-size: ${tokens.fontSizes['headingThree']};
      font-weight: ${tokens.fontWeights['semiBold']};
  `}
`

const ButtonContainer = styled.div`
  ${largerThan.lg`
    display: none;
  `}
`

const List = styled.div<{ open?: boolean }>`
  ${({ open }) => `
    display: ${open ? 'block' : 'none'};
    height: ${tokens.space['full']};
    padding-top: ${tokens.space['10']};
    
    ${largerThan.lg`
      display: block;
      margin-bottom: ${tokens.space['24']};
      padding-bottom: ${tokens.space['24']};
      padding-top: ${tokens.space['5']};
    `}
  `}
`

const FlexContainer = styled.div<{ space?: Space }>`
  ${({ space }) => `
    display: flex;
    flex-direction: column;
    gap: ${tokens.space[space ?? '4']};
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
              size="small"
              variant="transparent"
              onClick={() => setState((x) => ({ ...x, open: !x.open }))}
            >
              <div aria-label={state.open ? 'Close menu' : 'Open menu'}>
                <MenuSVG alt="Menu" height={24} width={24} />
              </div>
            </Button>
          </ButtonContainer>
        </NavlinkContainer>
      </ContainerInner>

      <List open={state.open} style={{ overflow: 'scroll' }}>
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
  width: ${tokens.space['max']};
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
  font-weight: ${tokens.fontWeights['semiBold']};

  color: ${
    active
      ? tokens.colors[theme.mode].accent
      : tokens.colors[theme.mode].textTertiary
  };
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
