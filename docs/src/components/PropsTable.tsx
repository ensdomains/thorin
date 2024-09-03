import * as React from 'react'
import type { PropItem, PropItemType } from 'react-docgen-typescript'
import GithubSVG from '~/assets/Github.svg'

import {
  Button,
  Typography,
  VisuallyHidden,
  Box,
  EyeStrikethroughSVG,
  EyeSVG,
} from '@ensdomains/thorin'

import property from 'lodash/property'

import { ScrollBox } from '@ensdomains/thorin'

type Props = {
  sourceLink?: string
  types: Record<string, PropItem>
}

const TableHead = ({
  children,
}: React.PropsWithChildren) => (
  <Box as="th" position="sticky">
    <Box as="div" padding="4" textAlign="left">
      <Typography fontVariant="bodyBold" textTransform="capitalize">
        {children}
      </Typography>
    </Box>
  </Box>
)

const DataCell = ({ children }: React.PropsWithChildren) => (
  <Box as="td" borderTop="1px solid" borderTopColor="$border" padding="4">
    {children}
  </Box>
)

const formatPropType = (type: PropItemType): string => {
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
    showDescriptions: Object.values(types).some(x => x.description !== ''),
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
      {props.length
        ? (
            <ScrollBox>
              <Box
                as="table"
                width="full"
                borderSpacing="0"
                borderWidth="1x"
                borderStyle="solid"
                borderColor="$border"
                borderRadius="large"
                overflow="hidden"
              >
                <Box as="thead" backgroundColor="$greySurface">
                  <tr>
                    {headers.map(x => (
                      <TableHead key={x}>
                        {x}
                      </TableHead>
                    ))}
                  </tr>
                </Box>
                <tbody>
                  {props.map(x => (
                    <tr key={x.name}>
                      <DataCell>
                        <Typography as="span">{x.name}</Typography>
                        {x.required && (
                          <Typography as="span" color="red" fontVariant="small">
                        &nbsp;*
                            <VisuallyHidden>Required</VisuallyHidden>
                          </Typography>
                        )}
                      </DataCell>
                      <DataCell>
                        <Typography
                          color="blueActive"
                          font="mono"
                          fontVariant="small"
                        >
                          {formatPropType(x.type)}
                        </Typography>
                      </DataCell>
                      <DataCell>
                        <Typography>
                          {x.defaultValue?.value.toString() ?? '-'}
                        </Typography>
                      </DataCell>

                      {state.showDescriptions && (
                        <DataCell>
                          <Typography>{x.description || '-'}</Typography>
                        </DataCell>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Box>
            </ScrollBox>
          )
        : (
            <div>
              <Typography color="textSecondary">No props</Typography>
            </div>
          )}
      <Box display="flex" justifyContent="flex-end" marginTop="$2">
        {!!props.length && (
          <div>
            <Button
              colorStyle="transparent"
              color="accent"
              size="small"
              prefix={
                state.showDescriptions ? <EyeStrikethroughSVG /> : <EyeSVG />
              }
              onClick={() =>
                setState(x => ({
                  ...x,
                  showDescriptions: !x.showDescriptions,
                }))}
            >
              {state.showDescriptions ? 'Description' : 'Description'}
            </Button>
          </div>
        )}

        {sourceLink && (
          <div>
            <Button
              as="a"
              href={sourceLink}
              colorStyle="transparent"
              color="accent"
              size="small"
              prefix={<Box as={<GithubSVG />} width="$3" />}
            >
              View Source
            </Button>
          </div>
        )}
      </Box>
    </>
  )
}
