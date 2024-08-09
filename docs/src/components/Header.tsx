import * as React from 'react'

import { Box, Heading, Typography } from '@ensdomains/thorin'

type Props = {
  description?: React.ReactNode
  title: React.ReactNode
}

export const Header = ({ description, title }: Props) => {
  return (
    <Box as="header" paddingTop={{ base: '$20', sm: '$24' }}>
      <Box
        display="flex"
        flexDirection="column"
        gap="$6"
        paddingTop={{ base: '$4', sm: '$6' }}
      >
        <Heading color="text" level="1">
          {title}
        </Heading>
        {description && <Typography>{description}</Typography>}
      </Box>
    </Box>
  )
}
