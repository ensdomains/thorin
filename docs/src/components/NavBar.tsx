import { Box, MenuSVG, CrossSVG } from '@ensdomains/thorin'
import { Link } from './Link'
import { FigmaSVG, GithubSVG } from '~/assets'

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
      borderBottomWidth="1x"
      borderBottomStyle="solid"
      borderBottomColor="border"
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
              opacity={open ? '1' : '0'}
              transitionDuration={200}
              transitionProperty="all"
              transitionTimingFunction="ease-in-out"
            />
            <Box
              as={MenuSVG}
              position="absolute"
              wh="full"
              opacity={open ? '0' : '1'}
              transitionProperty="all"
              transitionDuration={200}
              transitionTimingFunction="ease-in-out"
            />
          </Box>
        </Box>
        <Link href="/">
          <Box as="a" display="flex">
            <Box height="6" as="img" src="/ENSFull.svg" alt="ENS" />
          </Box>
        </Link>
      </Box>
      <Box display="flex" gap="4" alignItems="center">
        <Link href="https://github.com/ensdomains/thorin">
          <Box color="text" wh="6">
            <GithubSVG />
          </Box>
        </Link>
        <Link href="https://www.figma.com/community/file/1303431204471074291/thorin">
          <Box wh="6">
            <FigmaSVG />
          </Box>
        </Link>
        {/* TODO: Readd after fixing. Crashing docs page. */}
        {/* <Tag size="small">v1.0</Tag> */}
      </Box>
    </Box>
  )
}
