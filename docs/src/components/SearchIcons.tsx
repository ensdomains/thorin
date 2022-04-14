import * as React from 'react'
import styled from 'styled-components'

import {
  Input,
  SearchSVG,
  Typography,
  largerThan,
  tokens,
} from '@ensdomains/thorin'
import * as Components from '@ensdomains/thorin'

import { Link } from '~/components'

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

const FlexContainer = styled.div`
  gap: ${tokens.space['8']};
`

const IconGrid = styled.div`
  display: grid;
  gap: ${tokens.space['4']};
  grid-template-columns: repeat(auto-fit, minmax(${tokens.space['18']}, 1fr));
  ${largerThan.md`
        grid-template-columns: repeat(auto-fit, minmax(${tokens.space['20']}, 1fr));
  `}
`

const IconGridInner = styled.div`
  max-width: ${tokens.space['18']};

  ${largerThan.md`
      max-width: ${tokens.space['20']};
  `}
`

const IconGridFlex = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.space['2']};
`

const ComponentContainer = styled.div`
  ${({ theme }) => `
    background-color: ${tokens.colors[theme.mode].foregroundTertiary};
    border-radius: ${tokens.radii['large']};
    box-shadow-color: ${tokens.colors.base.transparent};
    color: ${tokens.colors[theme.mode].foreground};
    padding: ${tokens.space['4']};
    width: ${tokens.space['max']};
    transition-duration: ${tokens.transitionDuration['150']};
    transition-property: box-shadow;
    transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
    
    box-shadow: ${tokens.boxShadows[theme.mode]['1']}; 
    
    &:hover {
      box-shadow: ${tokens.boxShadows[theme.mode]['1']};
    }
    
    &:active {
      box-shadow: ${tokens.boxShadows[theme.mode]['0.5']};
    }
  `}
`

const IconNameContainer = styled.div`
  width: ${tokens.space['14']};

  ${largerThan.md`
    width: ${tokens.space['18']};
  `}
`

const IconName = styled(Typography)`
  ${({ theme }) => `
    text-align: center;
    size: ${tokens.fontSizes['label']};
    color: ${tokens.colors[theme.mode].text};
  `}
`

export const SearchIcons = () => {
  const [state, setState] = React.useState<State>(initialState)

  const filteredIcons = React.useMemo(() => {
    if (!state.query?.length) return icons
    return icons.filter((x) =>
      x.name.toLowerCase().includes(state.query.toLowerCase()),
    )
  }, [state.query])

  return (
    <FlexContainer>
      <Input
        hideLabel
        label="Search icons"
        placeholder="Search icons"
        prefix={<SearchSVG />}
        value={state.query}
        onChange={(event) =>
          setState((x) => ({ ...x, query: event.target.value }))
        }
      />

      <IconGrid>
        {filteredIcons.map((x) => (
          <Link href={`/components/${x.name}`} key={x.name}>
            <IconGridInner>
              <IconGridFlex>
                <ComponentContainer>
                  {React.createElement(x.Component as any)}
                </ComponentContainer>
                <IconNameContainer>
                  <IconName ellipsis>{x.name.replace('Icon', '')}</IconName>
                </IconNameContainer>
              </IconGridFlex>
            </IconGridInner>
          </Link>
        ))}
      </IconGrid>
    </FlexContainer>
  )
}
