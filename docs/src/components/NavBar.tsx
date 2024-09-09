import { Box, MenuSVG, CrossSVG } from '@ensdomains/thorin'
import LogoSVG from '~/assets/ENSLogo.svg'
import GithubSVG from '~/assets/Github.svg'
import FigmaSVG from '~/assets/Figma.svg'
import { Link } from './Link'
import { Tag } from '@ensdomains/thorin'

export const NavBar = ({
  open,
  onToggle,
}: {
  open: boolean
  onToggle?: () => void
}) => {
  return (
    <Box
      display="flex"
      position="fixed"
      justifyContent="space-between"
      alignItems="center"
      top="0"
      left="0"
      right="0"
      padding={{ base: '4', sm: '6' }}
      backgroundColor="backgroundPrimary"
      height={{ base: '20', sm: '24' }}
      // borderBottom="1px solid"
      // borderBottomColor="border"
    >
      <Box display="flex">
        <Box
          as="button"
          display={{ base: 'block', sm: 'none' }}
          onClick={onToggle}
          padding="4"
          // marginLeft="-16px"
          backgroundColor="transparent"
          // outline="none"
        >
          <Box wh="6" position="relative">
            <Box
              as={CrossSVG}
              wh="full"
              position="absolute"
              opacity={open ? 1 : 0}
              // transition="opacity 0.2s ease-in-out"
            />
            <Box
              as={MenuSVG}
              position="absolute"
              wh="full"
              opacity={open ? 0 : 1}
              // transition="opacity 0.2s ease-in-out"
            />
          </Box>
        </Box>
        <Link href="/">
          <Box as={LogoSVG} height="12" />
        </Link>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Link href="https://github.com/ensdomains/thorin">
          <Box as={GithubSVG} color="text" wh="4" />
        </Link>
        <Link href="https://github.com/ensdomains/thorin">
          <Box as={FigmaSVG} wh="4" />
        </Link>
        <Tag size="small">v1.0</Tag>
      </Box>
    </Box>
  )
}
