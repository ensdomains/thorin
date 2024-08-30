import * as React from 'react'

import type {
  BoxProps } from '@ensdomains/thorin'
import {
  Card,
  Input,
  MagnifyingGlassSimpleSVG,
  Typography,
  Box,
} from '@ensdomains/thorin'
import * as Components from '@ensdomains/thorin'

const icons = Object.entries(Components as Record<string, any>)
  .filter(([k]) => k.includes('SVG'))
  .map(([name, Component]) => ({ name, Component }))
  .sort((a, b) => (a.name > b.name ? 1 : -1))

type State = {
  query: string
}

const initialState: State = {
  query: '',
}

const FlexContainer = (props: BoxProps) => (
  <Box {...props} gap="$8" display="flex" flexDirection="column" />
)

const IconGrid = (props: BoxProps) => (
  <Box
    {...props}
    display="grid"
    gap="$4"
    gridTemplateColumns={{
      base: 'repeat(auto-fit, minmax(4.5rem, 1fr))',
      md: 'repeat(auto-fit, minmax(5rem, 1fr))',
    }}
  />
)

const IconGridInner = (props: BoxProps) => (
  <Box {...props} maxWidth={{ base: '$18', md: '$20' }} />
)

const IconGridFlex = (props: BoxProps) => (
  <Box
    {...props}
    display="flex"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
    gap="$2"
    cursor="pointer"
  />
)

const ComponentContainer = (props: BoxProps) => (
  <Box
    {...props}
    backgroundColor="$greySurface"
    borderRadius="$large"
    color="$grey"
    padding="$4"
    width="$max"
    transitionDuration="$150"
    transitionProperty="box-shadow"
    transitionTimingFunction="$inOut"
    boxShadow={{ base: '$1', hover: '$1', active: '$0.5' }}
  />
)

const IconNameContainer = (props: BoxProps) => (
  <Box {...props} width={{ base: '$14', md: '$18' }} />
)

export const SearchIcons = () => {
  const [state, setState] = React.useState<State>(initialState)

  const filteredIcons = React.useMemo(() => {
    if (!state.query?.length) return icons
    return icons.filter(x =>
      x.name.toLowerCase().includes(state.query.toLowerCase()),
    )
  }, [state.query])

  return (
    <Box my="$6">
      <Card>
        <FlexContainer>
          <Input
            hideLabel
            label="Search icons"
            placeholder="Search icons"
            prefix={<MagnifyingGlassSimpleSVG />}
            value={state.query}
            onChange={event =>
              setState(x => ({ ...x, query: event.target.value }))}
          />

          <IconGrid>
            {filteredIcons.map(x => (
              <IconGridInner
                key={x.name}
                onClick={() => navigator.clipboard.writeText(x.name)}
              >
                <IconGridFlex>
                  <ComponentContainer>
                    {React.createElement(x.Component as any, { height: 16, width: 16 })}
                  </ComponentContainer>
                  <IconNameContainer>
                    <Typography
                      ellipsis
                      fontVariant="smallBold"
                      textAlign="center"
                    >
                      {x.name.replace('SVG', '')}
                    </Typography>
                  </IconNameContainer>
                </IconGridFlex>
              </IconGridInner>
            ))}
          </IconGrid>
        </FlexContainer>
      </Card>
    </Box>
  )
}
