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

import property from 'lodash/property'

import { Link } from './Link'

type Props = {
  sourceLink?: string
  types: Record<string, PropItem>
}

const Container = styled.div`
  max-width: ${tokens.space['full']};
  overflow: scroll;

  ${largerThan.lg`
    overflow: unset;
  `}
`

const TableHead = styled.th`
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
      ${i === 0 ? `border-left-radius: ${tokens.radii['large']};` : ``}
      ${
        i === headers.length - 1
          ? `border-right-radius: ${tokens.radii['large']};`
          : ``
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

const DataCell = styled.td`
  padding: ${tokens.space['3']} ${tokens.space['4']};
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: ${tokens.space['2']};
`

const formatPropType = (type: any): string => {
  if (!type.raw) return type.name
  if (
    [
      'boolean',
      'string',
      'ReactNodeNoStrings',
      'ReactNode',
      'Button',
      'DynamicPopoverPopover',
    ].includes(type.raw)
  )
    return type.raw
  if (type.raw.indexOf('Ref') === 0) return type.raw
  if (type.raw.indexOf('ElementType') === 0) return type.raw
  if (type.value) return type.value.map(property('value')).join(' | ')
  return type.raw ?? type.name
}

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
              <tr style={{ textAlign: 'left', background: 'none' }}>
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
                  <DataCell>
                    <Name>
                      {x.name}
                      {x.required && (
                        <Required as="span">
                          *<VisuallyHidden>Required</VisuallyHidden>
                        </Required>
                      )}
                    </Name>
                  </DataCell>

                  <DataCell>
                    <RawName>{formatPropType(x.type)}</RawName>
                  </DataCell>

                  <DataCell>
                    <DefaultValue>
                      {x.defaultValue?.value.toString() ?? '-'}
                    </DefaultValue>
                  </DataCell>

                  {state.showDescriptions && (
                    <DataCell>
                      <Description>{x.description || '-'}</Description>
                    </DataCell>
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
            <div>
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
                {state.showDescriptions
                  ? 'Hide Description'
                  : 'Show Description'}
              </Button>
            </div>
          )}

          {sourceLink && (
            <div>
              <Link href={sourceLink}>
                <Button size="small" variant="secondary">
                  View Source on GitHub
                </Button>
              </Link>
            </div>
          )}
        </FlexContainer>
      </div>
    </>
  )
}
