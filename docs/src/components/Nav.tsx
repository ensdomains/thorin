import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import styled, { css } from 'styled-components'

import {
  Button,
  EnsSVG,
  MenuSVG,
  Space,
  Typography,
  mq,
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

const Container = styled.div(
  ({ theme }) => css`
    flex-direction: column;
    height: ${theme.space['full']};
    overflow: hidden;
  `,
)

const ContainerInner = styled.div(
  ({ theme }) => css`
    ${mq.lg.min(css`
      padding-bottom: ${theme.space['5']};
    `)}
  `,
)

const NavlinkContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: ${theme.space['5']};

    ${mq.lg.min(css`
      ${css`
        flex-direction: column;
      `}
    `)}
  `,
)

const NavLinkInner = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: ${theme.space['4']};
  `,
)

const ButtonContainer = styled.div(
  () => css`
    ${mq.lg.min(css`
      display: none;
    `)}
  `,
)

const List = styled.div<{ $open?: boolean }>(
  ({ theme, $open }) => css`
    display: ${$open ? 'block' : 'none'};
    height: ${theme.space['full']};
    padding-top: ${theme.space['10']};
    border-color: ${theme.colors.border};
    transition: border-color 0.15s ease-in-out;

    /* stylelint-disable-next-line selector-pseudo-element-no-unknown */
    &::-webkit-scrollbar-track {
      background-color: transparent;
      margin-bottom: ${theme.space['16']};
    }

    &::-webkit-scrollbar {
      width: ${theme.space['1.5']};
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border: none;
      border-radius: ${theme.radii.full};
      border-right-style: inset;
      border-right-width: calc(100vw + 100vh);
      border-color: inherit;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &:hover {
      border-color: hsla(${theme.colors.raw.greyPrimary}, 0.2);
    }

    ${mq.lg.min(css`
      display: block;
      padding-bottom: ${theme.space['18']};
      padding-top: ${theme.space['5']};
    `)}
  `,
)

const SubGroupLabel = styled(Typography)(
  () => css`
    text-transform: capitalize;
  `,
)

const FlexContainer = styled.div<{ $space?: Space }>(
  ({ theme, $space }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[$space ?? '4']};
  `,
)

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
              <EnsSVG height={48} width={48} />
              <Typography color="blue" typography="Heading/H3">
                ENS
              </Typography>
            </NavLinkInner>
          </NavLink>
          <ButtonContainer>
            <Button
              colorScheme="transparent"
              pressed={state.open}
              size="flexible"
              onClick={() => setState((x) => ({ ...x, open: !x.open }))}
            >
              <div
                aria-label={state.open ? 'Close menu' : 'Open menu'}
                style={{
                  height: 40,
                  width: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MenuSVG alt="Menu" height={24} width={24} />
              </div>
            </Button>
          </ButtonContainer>
        </NavlinkContainer>
      </ContainerInner>

      <List $open={!!state.open} style={{ overflow: 'scroll' }}>
        <FlexContainer $space="6">
          <FlexContainer $space="3">
            <NavLink href={createGitHubLink()}>GitHub</NavLink>
            <NavLink href={createPlayroomLink()}>Playroom</NavLink>
          </FlexContainer>

          <FlexContainer>
            <Typography typography="Body/Bold">Guides</Typography>
            <FlexContainer $space="3">
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
            <Typography typography="Body/Bold">Components</Typography>
            {links.map((x) => (
              <FlexContainer $space="3" key={x.name}>
                <SubGroupLabel color="text" typography="Small/XS Bold">
                  {x.name}
                </SubGroupLabel>
                <FlexContainer $space="3">
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

const HeaderLink = styled.div(
  ({ theme }) => css`
    transition: all 0.15s ease-in-out;
    width: ${theme.space['max']};
    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }

    & a {
      text-decoration: none;
    }
  `,
)

const NavLinkChildrenContainer = styled(Typography)<{ $active?: boolean }>(
  ({ theme, $active }) => css`
    font-weight: ${theme.fontWeights.bold};
    color: ${$active ? theme.colors.accent : theme.colors.greyPrimary};
  `,
)

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
        <NavLinkChildrenContainer {...{ $active: active }}>
          {children}
        </NavLinkChildrenContainer>
      </Link>
    </HeaderLink>
  )
}
