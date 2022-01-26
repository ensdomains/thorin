import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import NextImage from 'next/image'

import {
  Box,
  Button,
  IconMenu,
  Stack,
  Typography,
} from '@ensdomains/thorin/components'

import { createGitHubLink } from '~/utils/github'
import { createPlayroomLink } from '~/utils/playroom'
import { useIsMounted } from '~/utils/isMounted'
import * as styles from '~/styles/utils.css'
import { Link } from './Link'
import Logo from '~/assets/Logo.svg'

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
    <Box flexDirection="column" height="full">
      <Box paddingBottom={{ lg: '5' }}>
        <Stack
          align="center"
          direction={{ xs: 'horizontal', lg: 'vertical' }}
          justify={{ xs: 'space-between', lg: 'flex-start' }}
          space="5"
        >
          <NavLink active={router.asPath === '/'} href="/">
            <Stack align="center" direction="horizontal">
              <NextImage height={48} src={Logo} width={48} />
              <Typography color="blue" size="headingThree" weight="semiBold">
                ENS
              </Typography>
            </Stack>
          </NavLink>

          <Box display={{ lg: 'none' }}>
            <Button
              pressed={state.open}
              shadowless
              size="extraSmall"
              variant="transparent"
              onClick={() => setState((x) => ({ ...x, open: !x.open }))}
            >
              <Box aria-label={state.open ? 'Close menu' : 'Open menu'}>
                <IconMenu color="textPlaceholder" strokeWidth="0.75" />
              </Box>
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box
        className={styles.list}
        display={{ xs: state.open ? 'block' : 'none', lg: 'block' }}
        height="full"
        marginBottom={{ lg: '24' }}
        paddingBottom={{ lg: '24' }}
        paddingTop={{ xs: '10', lg: '5' }}
      >
        <Stack space="6">
          <Stack space="3">
            <NavLink href={createGitHubLink()}>GitHub</NavLink>
            <NavLink href={createPlayroomLink()}>Playroom</NavLink>
          </Stack>

          <Stack>
            <Typography variant="labelHeading">Guides</Typography>
            <Stack space="3">
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
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="labelHeading">Components</Typography>
            {links.map((x) => (
              <Stack key={x.name} space="3">
                <Typography variant="label">{x.name}</Typography>
                <Stack space="3">
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
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

const NavLink = ({
  active,
  href,
  children,
}: React.PropsWithChildren<{
  active?: boolean
  href: string
}>) => {
  return (
    <Box className={styles.headerLink} width="max">
      <Link href={href}>
        <Typography
          color={active ? 'accent' : 'textTertiary'}
          weight="semiBold"
        >
          {children}
        </Typography>
      </Link>
    </Box>
  )
}
