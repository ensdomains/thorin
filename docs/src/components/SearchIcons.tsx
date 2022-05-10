import * as React from 'react'
import styled from 'styled-components'

import { Input, SearchSVG, Typography, largerThan } from '@ensdomains/thorin'
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
  ${({ theme }) => `
    gap: ${theme.space['8']};
  `}
`

const IconGrid = styled.div`
  ${({ theme }) => `
    display: grid;
    gap: ${theme.space['4']};
    grid-template-columns: repeat(auto-fit, minmax(${theme.space['18']}, 1fr));
    ${largerThan.md`
          grid-template-columns: repeat(auto-fit, minmax(${theme.space['20']}, 1fr));
    `}
  `}
`

const IconGridInner = styled.div`
  ${({ theme }) => `
  max-width: ${theme.space['18']};

  ${largerThan.md`
      max-width: ${theme.space['20']};
  `}
  `}
`

const IconGridFlex = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['2']};
`

const ComponentContainer = styled.div`
  ${({ theme }) => `
    background-color: ${theme.colors.foregroundTertiary};
    border-radius: ${theme.radii['large']};
    box-shadow-color: ${theme.colors.transparent};
    color: ${theme.colors.foreground};
    padding: ${theme.space['4']};
    width: ${theme.space['max']};
    transition-duration: ${theme.transitionDuration['150']};
    transition-property: box-shadow;
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    
    box-shadow: ${theme.boxShadows['1']}; 
    
    &:hover {
      box-shadow: ${theme.boxShadows['1']};
    }
    
    &:active {
      box-shadow: ${theme.boxShadows['0.5']};
    }
  `}
`

const IconNameContainer = styled.div`
  ${({ theme }) => `
    width: ${theme.space['14']};

    ${largerThan.md`
      width: ${theme.space['18']};
    `}
  `}
`

const IconName = styled(Typography)`
  ${({ theme }) => `
    text-align: center;
    size: ${theme.fontSizes['label']};
    color: ${theme.colors.text};
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
