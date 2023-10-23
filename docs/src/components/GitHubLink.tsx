import { Box, Typography } from '@ensdomains/thorin'
import { Link } from './Link'
import GithubSVG from '~/assets/Github.svg'
export const GitHubLink = ({ href }: { href: string }) => (
  <Box width={'$full'} paddingBottom="$6" justifyContent={'center'}>
    <Link href={href}>
      <Box
        display={'flex'}
        gap={'$2'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box as={<GithubSVG />} wh="$4" display={'inline'} color="$accent" />
        <Typography color="accent" fontVariant="body">
          Edit on GitHub
        </Typography>
      </Box>
    </Link>
  </Box>
)
