import * as React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { PropItem } from 'react-docgen-typescript'

import { Button, Typography, VisuallyHidden, mq } from '@ensdomains/thorin'

import property from 'lodash/property'

import { Link } from './Link'

type Props = {
  sourceLink?: string
  types: Record<string, PropItem>
}

const Container = styled.div(
  ({ theme }) => css`
    max-width: ${theme.space['full']};
    overflow: scroll;

    ${mq.lg.min(css`
      overflow: unset;
    `)}
  `,
)

const TableHead = styled.th(
  ({ theme }) => css`
    background-color: ${theme.colors.background};
    position: sticky;
    top: 0;
  `,
)

const TableHeadLabelContainer = styled.div<{
  $i: number
  $headers: Array<string>
}>(
  ({ theme, $i, $headers }) => css`
    text-transform: capitalize;
    background-color: ${theme.colors.greySurface};
    border-color: ${theme.colors.greyBright};
    ${$i === 0 ? `border-left-radius: ${theme.radii['large']};` : ``}
    ${$i === $headers.length - 1
      ? `border-right-radius: ${theme.radii['large']};`
      : ``}
      padding: ${theme.space['2.5']} ${theme.space['4']};
  `,
)

const Name = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.fontSizes['small']};
  `,
)

const Required = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.fontSizes['small']};
  `,
)

const RawName = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.accent};
    font-size: ${theme.fontSizes['small']};
    font-family: ${theme.fonts['mono']};
  `,
)

const DefaultValue = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.greyDim};
    font-size: ${theme.fontSizes['small']};
  `,
)

const Description = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes['small']};
  `,
)

const NoProps = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.textSecondary};
  `,
)

const DataCell = styled.td(
  ({ theme }) => css`
    padding: ${theme.space['3']} ${theme.space['4']};
  `,
)

const FlexContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: ${theme.space['2']};
  `,
)

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
  const theme = useTheme()

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
          <table style={{ width: theme.space['full'] }}>
            <thead>
              <tr style={{ textAlign: 'left', background: 'none' }}>
                {headers.map((x, i) => (
                  <TableHead key={x}>
                    <TableHeadLabelContainer {...{ $i: i, $headers: headers }}>
                      <Typography color="text" typography="Small/XS Bold">
                        {x}
                      </Typography>
                    </TableHeadLabelContainer>
                  </TableHead>
                ))}
              </tr>
            </thead>

            <tbody>
              {props.map((x) => (
                <tr
                  key={x.name}
                  style={{ borderBottomWidth: theme.space['px'] }}
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

      <div style={{ margin: `${theme.space['2']} 0` }}>
        <FlexContainer>
          {!!props.length && (
            <div>
              <Button
                colorScheme="secondary"
                size="small"
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
                <Button colorScheme="secondary" size="small">
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
