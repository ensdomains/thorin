import {
  Box,
  Field,
  ThemeToggle,
  StarSVG,
  BrushSVG,
  GridSVG,
  Typography,
  BoxProps,
  ScrollBox,
  useTheme,
} from '@ensdomains/thorin'
import { Link } from './Link'
import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'

type Link = { name: string, route: string }

type Links = { name: string, links: Link[] }[]

const NavLink = ({
  active,
  href,
  children,
}: PropsWithChildren<{ active: boolean, href: string, target?: string }>) => (
  <Box>
    <Link href={href}>
      <Box
        backgroundColor={active ? '$blueSurface' : 'transparent'}
        height="$9"
        display="flex"
        alignItems="center"
        borderRadius="$large"
        px="$4"
      >
        <Typography color={active ? 'accent' : 'text'}>{children}</Typography>
      </Box>
    </Link>
  </Box>
)

const Heading = ({
  children,
  ...props
}: BoxProps & { icon: React.ReactElement }) => (
  <Box {...props} display="flex" gap="$2" alignItems="center" height="$9">
    <Typography fontVariant="bodyBold" color="textSecondary">
      {children}
    </Typography>
  </Box>
)

const Divider = () => (
  <Box
    width="$full"
    backgroundColor="$border"
    height="$px"
    flex="0 0 1px"
  />
)

export const SideBar = ({ open, links }: { open: boolean, links: Links }) => {
  const router = useRouter()
  const { setMode, mode } = useTheme()
  return (
    <Box
      display="flex"
      position="fixed"
      flexDirection="column"
      top={{ base: '$20', sm: '$24' }}
      left={{ base: open ? '$0' : '-100%', sm: '$0' }}
      width="$64"
      bottom="$0"
      backgroundColor="$backgroundPrimary"
      borderRight="1px solid"
      borderRightColor="$border"
      gap="$4"
      transition="left 0.2s ease-in-out"
      paddingRight="$1"
    >
      <ScrollBox width="$full" hideDividers>
        <Box padding="$4" display="flex" flexDirection="column" gap="$4">
          <Field
            label={(
              <Box height="$6.5" display="flex" alignItems="center">
                {mode === 'light' ? 'Light Theme' : 'Dark Theme'}
              </Box>
            )}
            inline
          >
            <ThemeToggle
              size="extraSmall"
              checked={mode === 'light'}
              onChange={(e) => {
                const newValue = e.target.checked ? 'light' : 'dark'
                if (newValue !== mode) setMode(newValue)
              }}
            />
          </Field>
          <Divider />
          <Box>
            <Heading icon={<StarSVG />}>Getting Started</Heading>
            <NavLink href="/" active={router.asPath === '/'}>
              Start Here
            </NavLink>
            <NavLink
              href="/guides/development"
              active={router.asPath === '/guides/development'}
            >
              Development
            </NavLink>
            <NavLink
              href="/guides/playroom"
              active={router.asPath === '/guides/playroom'}
              target="_blank"
            >
              Playroom
            </NavLink>
            <NavLink href="/" active={router.asPath === '/'}>
              Design
            </NavLink>
          </Box>
          <Divider />
          <Box>
            <Heading icon={<BrushSVG />}>Style</Heading>
            <NavLink
              href="/guides/logo"
              active={router.asPath === '/guides/logo'}
            >
              Logo
            </NavLink>
            <NavLink
              href="/guides/colors"
              active={router.asPath === '/guides/colors'}
            >
              Colours
            </NavLink>
            <NavLink
              href="/guides/icons"
              active={router.asPath === '/guides/icons'}
            >
              Icons
            </NavLink>
          </Box>
          <Divider />
          <Box>
            <Heading icon={<GridSVG />}>Components</Heading>
            {links.map(({ name, links }) => (
              <div key={name}>
                <Typography
                  key={name}
                  fontVariant="smallBold"
                  color="textSecondary"
                  px="$4"
                  textTransform="capitalize"
                  paddingTop="$3"
                  paddingBottom="$1"
                >
                  {name}
                </Typography>
                {links.map(({ name: _name, route }) => (
                  <NavLink
                    key={route}
                    href={route}
                    active={
                      !!router.asPath && router.asPath.split('#')[0] === route
                    }
                  >
                    {_name}
                  </NavLink>
                ))}
              </div>
            ))}
          </Box>
        </Box>
      </ScrollBox>
    </Box>
  )
}
