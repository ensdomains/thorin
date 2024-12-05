import * as React from 'react'

import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import clsx from 'clsx'
import * as styles from './Heading.css'
import type { Color } from '@/src/tokens/color'

interface HeadingContainerProps {
  textAlign?: React.CSSProperties['textAlign']
  textTransform: React.CSSProperties['textTransform']
  $level: '1' | '2'
  $color: NonNullable<Color>
}

const ContainerBox = React.forwardRef<
  HTMLElement,
  BoxProps & HeadingContainerProps
>(
  (
    { textAlign, textTransform, $level, $color, className, ...props },
    ref,
  ) => (
    <Box
      color={$color}
      fontFamily="sans"
      ref={ref}
      textAlign={textAlign}
      textTransform={textTransform}
      {...props}
      className={clsx(styles.heading({ level: $level }), className)}
    />
  ),
)

type NativeDivAttributes = React.HTMLAttributes<HTMLDivElement>

export type HeadingProps = {
  /** CSS property of textAlign */
  align?: React.CSSProperties['textAlign']
  /** JSX element to render. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend'
  children?: NativeDivAttributes['children']
  /** The id attribute of element */
  id?: NativeDivAttributes['id']
  /** CSS property of text-transform */
  transform?: React.CSSProperties['textTransform']
  level?: '1' | '2'
  color: Color
} &
Omit<NativeDivAttributes, 'color'>

export const Heading = React.forwardRef<HTMLHeadingElement | HTMLLegendElement, HeadingProps>(
  (
    {
      align,
      children,
      as = 'h1',
      id,
      level = '2',
      transform,
      color = 'text',
      ...props
    },
    ref,
  ) => (
    <ContainerBox
      {...props}
      $color={color}
      $level={level}
      textAlign={align}
      textTransform={transform}
      as={as}
      id={id}
      ref={ref}
    >
      {children}
    </ContainerBox>
  ),
)

Heading.displayName = 'Heading'
