import * as React from 'react'

import { WithColorStyle } from '@/src/types/withColorOrColorStyle'

import { getColorStyle } from '../../../css/utils/getColorStyle'

import { Box } from '../Box/Box'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export type Props = {
  /** Element type of container */
  as?: 'div' | 'span'
  /** If true, changes colors on hover */
  hover?: boolean
  /** Size of element */
  size?: 'small' | 'medium'
} & NativeDivProps &
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
        base: getColorStyle(colorStyle as any, 'background'),
        hover: getColorStyle(colorStyle as any, hover ? 'hover' : 'background'),
        active: getColorStyle(colorStyle as any, 'hover'),
      }}
      borderRadius="$full"
      color={getColorStyle(colorStyle as any, 'text')}
      display="flex"
      fontSize={size === 'small' ? '$extraSmall' : '$small'}
      fontWeight="$bold"
      lineHeight={size === 'small' ? '$extraSmall' : '$small'}
      px="$2"
      py="$0.5"
      transform={{
        hover: hover ? 'translateY(-1px)' : 'translateY(0px)',
        base: 'translateY(0px)',
        active: 'translateY(-1px)',
      }}
      transitionDuration="$150"
      transitionProperty="color, border-color, background-color"
      transitionTimingFunction="$inOut"
      width="$max"
      {...props}
    >
      {children}
    </Box>
  )
}

Tag.displayName = 'Tag'
