import { Box, Typography } from '@ensdomains/thorin'
import { Link } from './Link'
import { GithubSVG } from '~/assets'
export const GitHubLink = ({ href }: { href: string }) => (
  <Box width="full" paddingBottom="6" justifyContent="center">
    <Link href={href}>
      <Box
        display="flex"
        gap="2"
        alignItems="center"
        justifyContent="center"
      >
        <Box width="4" display="inline" color="accent">
          <GithubSVG />
        </Box>
        <Typography color="accent" fontVariant="body">
          Edit on GitHub
        </Typography>
      </Box>
    </Link>
  </Box>
)
