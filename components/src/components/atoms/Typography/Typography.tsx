import * as React from 'react'

import type { Font, FontSize, FontWeight } from '@/src/tokens/typography'

import type { Color, WithColor } from '@/src/interfaces/withColor'

import { removeNullishProps } from '@/src/utils/removeNullishProps'

import { Box, type BoxProps } from '../Box/Box'
import type { FontVariant } from './utils/variant.css'
import { fontVariant } from './utils/variant.css'
import clsx from 'clsx'

type ContainerProps = {
  $ellipsis?: boolean
  $fontVariant: FontVariant
  $size?: FontSize
  $color: Color
  $weight?: FontWeight
  $font: Font
}

const ContainerBox = React.forwardRef<HTMLElement, BoxProps & ContainerProps>(
  (
    { $ellipsis, $fontVariant = 'body', $color, $font, $weight, as, $size, className, ...props },
    ref,
  ) => (
    <Box
      as={as ?? 'div'}
      color={$color}
      fontFamily={$font}
      fontSize={$size}
      fontWeight={$weight}
      overflow={$ellipsis ? 'hidden' : undefined}
      ref={ref}
      textOverflow={$ellipsis ? 'ellipsis' : undefined}
      whiteSpace={$ellipsis ? 'nowrap' : undefined}
      {...props}
      className={clsx(fontVariant({ fontVariant: $fontVariant }), className)}
    />
  ),
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export type TypographyProps = {
  /** element type of container */
  as?:
    | 'code'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'p'
    | 'span'
    | 'i'
  /** If true, will truncate text with an elipsis on overflow. If false, text will break on the next word. */
  ellipsis?: boolean
  /** The classname attribute of contianer. */
  className?: NativeDivProps['className']
  /** The tokens.fontWeight value */
  /** A font value that overrides the existing font property  */
  font?: Font
  /** A weight value that overrides existing weight property */
  weight?: FontWeight

  fontVariant?: FontVariant
} & Omit<NativeDivProps, 'color' | 'as' | 'translate'> &
WithColor &
Omit<BoxProps, 'color'> & { fontVariant?: FontVariant }

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      as,
      children,
      ellipsis,
      fontVariant = 'body',
      font = 'sans',
      color = 'textPrimary',
      weight,
      textTransform,
      ...props
    },
    ref,
  ) => {
    return (
      <ContainerBox
        $color={color}
        $ellipsis={ellipsis ? true : undefined}
        $font={font}
        $fontVariant={fontVariant}
        $weight={weight}
        as={as}
        ref={ref}
        textTransform={textTransform}
        {...removeNullishProps(props)}
      >
        {children}
      </ContainerBox>
    )
  },
)

Typography.displayName = 'Typography'
