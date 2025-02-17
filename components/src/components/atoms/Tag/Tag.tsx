import * as React from 'react'

import { translateY } from '@/src/css/utils/common'

import { removeNullishProps } from '@/src/utils/removeNullishProps'

import * as styles from './styles.css'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import { clsx } from 'clsx'
import type { Colors, ColorStyles } from '@/src/tokens'
import { getColorStyleParts } from '@/src/utils/getColorStyleParts'
import { match } from 'ts-pattern'
import { assignInlineVars } from '@vanilla-extract/dynamic'

export type TagProps = {
  /** Element type of container */
  as?: 'div' | 'span'
  /** If true, changes colors on hover */
  hover?: boolean
  /** Size of element */
  size?: 'small' | 'medium'
  colorStyle?: ColorStyles
} & Omit<BoxProps, 'size'>

export const Tag: React.FC<TagProps> = ({
  as = 'div',
  children,
  hover,
  size = 'small',
  colorStyle = 'accentSecondary',
  className,
  style,
  ...props
}) => {
  const [baseColor, baseTheme] = getColorStyleParts(colorStyle)
  return (
    <Box
      alignItems="center"
      as={as}
      backgroundColor={{
        base: match(baseTheme)
          .with('Primary', () => `${baseColor}Primary` as Colors)
          .otherwise(() => `${baseColor}Surface` as Colors),
        hover: match(baseTheme)
          .with('Primary', (): Colors => hover ? `${baseColor}Bright` : `${baseColor}Primary`)
          .otherwise((): Colors => hover ? `${baseColor}Light` : `${baseColor}Surface`),
        active: match(baseTheme)
          .with('Primary', (): Colors => `${baseColor}Bright`)
          .otherwise((): Colors => `${baseColor}Light`),
      }}
      borderRadius="full"
      color={match(baseTheme).with('Primary', (): Colors => 'textAccent').otherwise((): Colors => `${baseColor}Primary`)}
      display="flex"
      fontSize={size === 'small' ? 'extraSmall' : 'small'}
      fontWeight="bold"
      lineHeight={size === 'small' ? 'extraSmall' : 'small'}
      px="2"
      py="0.5"

      transitionDuration={150}
      transitionTimingFunction="inOut"
      width="max"
      {...removeNullishProps(props)}
      style={{
        ...style, ...assignInlineVars({
          [styles.tagHover]: translateY(hover ? -1 : 0),
        }),
      }}
      className={clsx(className, styles.tag)}
    >
      {children}
    </Box>
  )
}

Tag.displayName = 'Tag'
