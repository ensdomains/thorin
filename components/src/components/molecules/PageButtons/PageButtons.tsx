import * as React from 'react'

import { getTestId } from '../../../utils/utils'
import type { BoxProps } from '../../atoms'
import { Box } from '../../atoms'
import { getValueForSize } from './utils/getValueForSize'

export type Size = 'small' | 'medium'

export type PageButtonsProps = {
  /** Total number of pages */
  total: number
  current: number
  /** Maximum number of buttons to show */
  max?: number
  size?: Size
  alwaysShowFirst?: boolean
  alwaysShowLast?: boolean
  showEllipsis?: boolean
  onChange: (value: number) => void
} & Omit<BoxProps, 'children' | 'onChange' | 'size'>

enum Marker {
  ellipsis = -1,
}

const Container = (props: BoxProps) => (
  <Box
    {...props}
    alignItems="center"
    display="flex"
    flexDirection="row"
    gap="2"
    justifyContent="center"
  />
)

type PageButtonProps = {
  $selected?: boolean
  $size: Size
}

const PageButton = ({
  $selected,
  $size,
  ...props
}: PageButtonProps & BoxProps) => (
  <Box
    {...props}
    as="button"
    backgroundColor={{ base: 'background', hover: 'greySurface' }}
    borderWidth="1x"
    borderStyle="solid"
    borderColor="border"
    borderRadius={getValueForSize($size, 'borderRadius')}
    color={$selected ? 'accent' : 'greyPrimary'}
    cursor={$selected ? 'default' : 'pointer'}
    fontSize={getValueForSize($size, 'fontSize')}
    fontWeight="bold"
    height={getValueForSize($size, 'height')}
    lineHeight={getValueForSize($size, 'lineHeight')}
    minWidth={getValueForSize($size, 'minWidth')}
    padding="2"
    pointerEvents={$selected ? 'none' : 'auto'}
    transitionDuration={150}
    transitionProperty="all"
    transitionTimingFunction="ease-in-out"
  />
)

const Dots = (props: BoxProps) => (
  <Box
    {...props}
    as="p"
    color="greyPrimary"
    fontSize="small"
    fontWeight="bold"
  />
)

export const PageButtons: React.FC<PageButtonsProps> = ({
  total,
  current,
  max = 5,
  size = 'medium',
  alwaysShowFirst,
  alwaysShowLast,
  showEllipsis = true,
  onChange,
  ...props
}) => {
  const maxPerSide = Math.floor(max / 2)
  const start = Math.max(
    Math.min(Math.max(current - maxPerSide, 1), total - max + 1),
    1,
  )
  const pageNumbers = Array.from({ length: max }, (_, i) => start + i).filter(
    x => x <= total,
  )

  if (total > max) {
    if (alwaysShowFirst && start > 1) {
      if (showEllipsis) {
        pageNumbers[0] = Marker.ellipsis
        pageNumbers.unshift(1)
      }
      else {
        pageNumbers[0] = 1
      }
    }
    else if (showEllipsis && start > 1) {
      pageNumbers.unshift(Marker.ellipsis)
    }

    if (alwaysShowLast && total > current + maxPerSide) {
      if (showEllipsis) {
        pageNumbers[pageNumbers.length - 1] = Marker.ellipsis
        pageNumbers.push(total)
      }
      else {
        pageNumbers[pageNumbers.length - 1] = total
      }
    }
    else if (showEllipsis && total > current + maxPerSide) {
      pageNumbers.push(Marker.ellipsis)
    }
  }

  return (
    <Container
      {...{ ...props, 'data-testid': getTestId(props, 'pagebuttons') }}
    >
      {pageNumbers.map((value, i) =>
        value === Marker.ellipsis
          ? (

              <Dots data-testid="pagebutton-dots" key={`${value}-${i}`}>
                ...
              </Dots>
            )
          : (
              <PageButton
                $selected={value === current}
                $size={size}
                data-testid="pagebutton"
                key={value}
                type="button"
                onClick={() => onChange(value)}
              >
                {value}
              </PageButton>
            ),
      )}
    </Container>
  )
}

PageButtons.displayName = 'PageButtons'
