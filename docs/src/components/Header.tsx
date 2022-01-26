import * as React from 'react'

import { Box, Heading, Stack, Typography } from '@ensdomains/thorin/components'

type Props = {
  description?: React.ReactNode
  title: React.ReactNode
}

export const Header = ({ description, title }: Props) => {
  return (
    <Box as="header" marginBottom={description ? '16' : '10'}>
      <Stack space="10">
        <Heading color="foreground" level="1">
          {title}
        </Heading>

        {description && (
          <Typography color="textSecondary" size="extraLarge">
            {description}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
