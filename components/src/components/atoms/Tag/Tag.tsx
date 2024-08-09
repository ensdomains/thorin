import * as React from 'react'

import { translateY } from '@/src/css/utils/common'

import { removeNullishProps } from '@/src/utils/removeNullishProps'

import { WithColorStyle, getValueForColorStyle } from './utils/withColorStyle'

import { Box, BoxProps } from '../Box/Box'

export type Props = {
  /** Element type of container */
  as?: 'div' | 'span'
  /** If true, changes colors on hover */
  hover?: boolean
  /** Size of element */
  size?: 'small' | 'medium'
} & Omit<BoxProps, 'size'> &
WithColorStyle

export const Tag = ({
  as = 'div',
  children,
  hover,
  size = 'small',
  colorStyle = 'accentSecondary',
  ...props
}: Props) => {
  return (
    <Box
      alignItems="center"
      as={as}
      backgroundColor={{
        base: getValueForColorStyle(colorStyle, 'background'),
        hover: getValueForColorStyle(
          colorStyle as any,
          hover ? 'hover' : 'background',
        ),
        active: getValueForColorStyle(colorStyle, 'hover'),
      }}
      borderRadius="$full"
      color={getValueForColorStyle(colorStyle, 'content')}
      display="flex"
      fontSize={size === 'small' ? '$extraSmall' : '$small'}
      fontWeight="$bold"
      lineHeight={size === 'small' ? '$extraSmall' : '$small'}
      px="$2"
      py="$0.5"
      transform={{
        base: translateY(0),
        hover: translateY(hover ? -1 : 0),
        active: translateY(-1),
      }}
      transitionDuration="$150"
      transitionProperty="color, border-color, background-color, transform"
      transitionTimingFunction="$inOut"
      width="$max"
      {...removeNullishProps(props)}
    >
      {children}
    </Box>
  )
}

Tag.displayName = 'Tag'
