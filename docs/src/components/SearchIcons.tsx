import * as React from 'react'
import styled, { css } from 'styled-components'

import {
  Card,
  Input,
  MagnifyingGlassSimpleSVG,
  Typography,
  mq,
} from '@ensdomains/thorin'
import * as Components from '@ensdomains/thorin'

const icons = Object.entries(Components)
  .filter(([k]) => k.includes('SVG'))
  .map(([name, Component]) => ({ name, Component }))
  .sort((a, b) => (a.name > b.name ? 1 : -1))

type State = {
  query: string
}

const initialState: State = {
  query: '',
}

const FlexContainer = styled.div(
  ({ theme }) => css`
    gap: ${theme.space['8']};

    & > div:first-child {
      margin-bottom: ${theme.space['8']};
    }
  `,
)

const IconGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    gap: ${theme.space['4']};
    grid-template-columns: repeat(auto-fit, minmax(${theme.space['18']}, 1fr));
    ${mq.md.min(css`
      grid-template-columns: repeat(
        auto-fit,
        minmax(${theme.space['20']}, 1fr)
      );
    `)}
  `,
)

const IconGridInner = styled.div(
  ({ theme }) => css`
    max-width: ${theme.space['18']};

    ${mq.md.min(css`
      max-width: ${theme.space['20']};
    `)}
  `,
)

const IconGridFlex = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.space['2']};

    cursor: pointer;
  `,
)

const ComponentContainer = styled.div(
  ({ theme }) => css`
    background-color: ${theme.colors.greySurface};
    border-radius: ${theme.radii['large']};
    color: ${theme.colors.grey};
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
  `,
)

const IconNameContainer = styled.div(
  ({ theme }) => css`
    width: ${theme.space['14']};

    ${mq.md.min(css`
      width: ${theme.space['18']};
    `)}
  `,
)

const IconName = styled(Typography)(
  ({ theme }) => css`
    text-align: center;
    size: ${theme.fontSizes.small};
    color: ${theme.colors.text};
  `,
)

export const SearchIcons = () => {
  const [state, setState] = React.useState<State>(initialState)

  const filteredIcons = React.useMemo(() => {
    if (!state.query?.length) return icons
    return icons.filter((x) =>
      x.name.toLowerCase().includes(state.query.toLowerCase()),
    )
  }, [state.query])

  return (
    <Card>
      <FlexContainer>
        <Input
          hideLabel
          label="Search icons"
          placeholder="Search icons"
          prefix={<MagnifyingGlassSimpleSVG />}
          value={state.query}
          onChange={(event) =>
            setState((x) => ({ ...x, query: event.target.value }))
          }
        />

        <IconGrid>
          {filteredIcons.map((x) => (
            <IconGridInner
              key={x.name}
              onClick={() => navigator.clipboard.writeText(x.name)}
            >
              <IconGridFlex>
                <ComponentContainer>
                  {React.createElement(x.Component as any)}
                </ComponentContainer>
                <IconNameContainer>
                  <IconName ellipsis>{x.name.replace('SVG', '')}</IconName>
                </IconNameContainer>
              </IconGridFlex>
            </IconGridInner>
          ))}
        </IconGrid>
      </FlexContainer>
    </Card>
  )
}
