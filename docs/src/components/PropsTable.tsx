import * as React from 'react'
import styled from 'styled-components'
import { PropItem } from 'react-docgen-typescript'

import {
  Button,
  Typography,
  VisuallyHidden,
  largerThan,
  tokens,
} from '@ensdomains/thorin'

import { Link } from './Link'

type Props = {
  sourceLink?: string
  types: Record<string, PropItem>
}

const dataProps = {
  as: 'td',
  paddingX: '4',
  paddingY: '3',
}

const Container = styled.div`
  max-width: ${tokens.space['full']};
  overflow: scroll;

  ${largerThan.lg`
    overflow: unset;
  `}
`

const TableHead = styled.div`
  ${({ theme }) => `
      background-color: ${tokens.colors[theme.mode].background};
      position: sticky;
      top: 0;
  `}
`

const TableHeadLabelContainer = styled.div<{
  i: number
  headers: Array<string>
}>`
  ${({ theme, i, headers }) => `
      background-color: ${tokens.colors[theme.mode].foregroundTertiary};
      border-color: ${tokens.colors[theme.mode].foregroundSecondary};
      ${i === 0 && `border-left-radius: ${tokens.radii['large']};`}
      ${
        i === headers.length - 1 &&
        `border-right-radius: ${tokens.radii['large']};`
      }
      padding: ${tokens.space['2.5']} ${tokens.space['4']};
`}
`

const Name = styled(Typography)`
  ${({ theme }) => `
      color: ${tokens.colors[theme.mode].text};
      font-size: ${tokens.fontSizes['small']};
`}
`

const Required = styled(Typography)`
  ${({ theme }) => `
      color: ${tokens.colors[theme.mode].red};
      font-size: ${tokens.fontSizes['small']};
`}
`

const RawName = styled(Typography)`
  ${({ theme }) => `
      color: ${tokens.colors[theme.mode].accent};
      font-size: ${tokens.fontSizes['small']};
      font-family: ${tokens.fonts['mono']};
`}
`

const DefaultValue = styled(Typography)`
  ${({ theme }) => `
      color: ${tokens.colors[theme.mode].textSecondary};
      font-size: ${tokens.fontSizes['small']};
`}
`

const Description = styled(Typography)`
  ${({ theme }) => `
      color: ${tokens.colors[theme.mode].textSecondary};
      font-size: ${tokens.fontSizes['small']};
`}
`

const NoProps = styled(Typography)`
  ${({ theme }) => `
      color: ${tokens.colors[theme.mode].textSecondary};
`}
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: ${tokens.space['2']};
`

export const PropsTable = ({ sourceLink, types }: Props) => {
  const [state, setState] = React.useState<{
    showDescriptions: boolean
  }>({
    showDescriptions: Object.values(types).some((x) => x.description !== ''),
  })

  const headers = [
    'name',
    'type',
    'default',
    ...(state.showDescriptions ? ['description'] : []),
  ]
  const props = Object.values(types).sort((a, b) => {
    if (a.name.startsWith('on') || b.name.startsWith('on')) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return (
    <>
      {props.length ? (
        <Container>
          <table style={{ width: tokens.space['full'] }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                {headers.map((x, i) => (
                  <TableHead key={x}>
                    <TableHeadLabelContainer {...{ i, headers }}>
                      <Typography variant="label">{x}</Typography>
                    </TableHeadLabelContainer>
                  </TableHead>
                ))}
              </tr>
            </thead>

            <tbody>
              {props.map((x) => (
                <tr
                  key={x.name}
                  style={{ borderBottomWidth: tokens.space['px'] }}
                >
                  <div {...dataProps}>
                    <Name>
                      {x.name}
                      {x.required && (
                        <Required as="span">
                          *<VisuallyHidden>Required</VisuallyHidden>
                        </Required>
                      )}
                    </Name>
                  </div>

                  <div {...dataProps}>
                    <RawName>{x.type.raw ?? x.type.name}</RawName>
                  </div>

                  <div {...dataProps}>
                    <DefaultValue>
                      {x.defaultValue?.value.toString() ?? '-'}
                    </DefaultValue>
                  </div>

                  {state.showDescriptions && (
                    <div {...dataProps}>
                      <Description>{x.description || '-'}</Description>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      ) : (
        <div>
          <NoProps>No props</NoProps>
        </div>
      )}

      <div style={{ margin: `${tokens.space['2']} 0` }}>
        <FlexContainer>
          {!!props.length && (
            <Button
              size="small"
              variant="secondary"
              onClick={() =>
                setState((x) => ({
                  ...x,
                  showDescriptions: !x.showDescriptions,
                }))
              }
            >
              {state.showDescriptions ? 'Hide Description' : 'Show Description'}
            </Button>
          )}

          {sourceLink && (
            <Link href={sourceLink}>
              <Button size="small" variant="secondary">
                View Source on GitHub
              </Button>
            </Link>
          )}
        </FlexContainer>
      </div>
    </>
  )
}
