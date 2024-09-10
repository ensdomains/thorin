import * as React from 'react'

import { translateY } from '@/src/css/utils/common'

import { removeNullishProps } from '@/src/utils/removeNullishProps'

import type { WithColorStyle } from './utils/withColorStyle'
import { getValueForColorStyle } from './utils/withColorStyle'
import * as styles from './styles.css'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import clsx from 'clsx'

export type TagProps = {
  /** Element type of container */
  as?: 'div' | 'span'
  /** If true, changes colors on hover */
  hover?: boolean
  /** Size of element */
  size?: 'small' | 'medium'
} & Omit<BoxProps, 'size'> &
WithColorStyle

export const Tag: React.FC<TagProps> = ({
  as = 'div',
  children,
  hover,
  size = 'small',
  colorStyle = 'accentSecondary',
  className,
  ...props
}) => {
  return (
    <Box
      className={clsx(className, styles.tag)}
      alignItems="center"
      as={as}
      backgroundColor={{
        base: getValueForColorStyle(colorStyle, 'background'),
        hover: getValueForColorStyle(
          colorStyle,
          hover ? 'hover' : 'background',
        ),
        active: getValueForColorStyle(colorStyle, 'hover'),
      }}
      borderRadius="full"
      color={getValueForColorStyle(colorStyle, 'content')}
      display="flex"
      fontSize={size === 'small' ? 'extraSmall' : 'small'}
      fontWeight="bold"
      lineHeight={size === 'small' ? 'extraSmall' : 'small'}
      px="2"
      py="0.5"
      transform={{
        base: translateY(0),
        hover: translateY(hover ? -1 : 0),
        active: translateY(-1),
      }}
      transitionDuration={150}
      transitionTimingFunction="inOut"
      width="max"
      {...removeNullishProps(props)}
    >
      {children}
    </Box>
  )
}

Tag.displayName = 'Tag'
