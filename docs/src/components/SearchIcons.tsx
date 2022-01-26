import * as React from 'react'

import {
  Box,
  IconSearch,
  Input,
  Stack,
  Typography,
} from '@ensdomains/thorin/components'
import * as Components from '@ensdomains/thorin/components'

import { Link } from '~/components'
import { iconGrid } from '~/styles/utils.css'

const icons = Object.entries(Components)
  .filter(([k]) => k.includes('Icon'))
  .map(([name, Component]) => ({ name, Component }))
  .sort((a, b) => (a.name > b.name ? 1 : -1))

type State = {
  query: string
}

const initialState: State = {
  query: '',
}

export const SearchIcons = () => {
  const [state, setState] = React.useState<State>(initialState)

  const filteredIcons = React.useMemo(() => {
    if (!state.query?.length) return icons
    return icons.filter((x) =>
      x.name.toLowerCase().includes(state.query.toLowerCase()),
    )
  }, [state.query])

  return (
    <Stack space="8">
      <Input
        hideLabel
        label="Search icons"
        placeholder="Search icons"
        prefix={<IconSearch />}
        value={state.query}
        onChange={(event) =>
          setState((x) => ({ ...x, query: event.target.value }))
        }
      />

      <Box as="ul" className={iconGrid} display="grid" gap="4">
        {filteredIcons.map((x) => (
          <Link href={`/components/${x.name}`} key={x.name}>
            <Box maxWidth={{ xs: '18', md: '20' }}>
              <Stack align="center" space="2">
                <Box
                  backgroundColor="foregroundTertiary"
                  borderRadius="large"
                  boxShadow={{ base: '1', hover: '1', active: '0.5' }}
                  boxShadowColor={{
                    base: 'transparent',
                  }}
                  color="foreground"
                  padding="4"
                  transitionDuration="150"
                  transitionProperty="shadow"
                  transitionTimingFunction="inOut"
                  width="max"
                >
                  {React.createElement(x.Component as any, {
                    size: { xs: '10', md: '12' },
                  })}
                </Box>
                <Box width={{ xs: '14', md: '18' }}>
                  <Typography align="center" color="text" ellipsis size="label">
                    {x.name.replace('Icon', '')}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Link>
        ))}
      </Box>
    </Stack>
  )
}
