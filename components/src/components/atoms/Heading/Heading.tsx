import * as React from 'react'

import { WithColor } from '@/src/types/withColorOrColorStyle'

import { Box, BoxProps } from '../Box/Box'
import { getValueForLevel } from './utils/getValueForLevel'

interface HeadingContainerProps {
  $textAlign?: React.CSSProperties['textAlign']
  $textTransform: React.CSSProperties['textTransform']
  $level: '1' | '2'
  $responsive?: boolean
  $color: NonNullable<WithColor['color']>
}

const ContainerBox = React.forwardRef<
  HTMLElement,
  BoxProps & HeadingContainerProps
>(
  (
    { $textAlign, $textTransform, $level, $responsive, $color, ...props },
    ref,
  ) => (
    <Box
      color={$color}
      fontFamily="$sans"
      fontSize={getValueForLevel($level, 'fontSize', $responsive)}
      fontWeight={getValueForLevel($level, 'fontWeight', $responsive)}
      lineHeight={getValueForLevel($level, 'lineHeight', $responsive)}
      ref={ref}
      textAlign={$textAlign as any}
      textTransform={$textTransform as any}
      {...props}
    />
  ),
)

type NativeDivAttributes = React.HTMLAttributes<HTMLDivElement>

type Props = {
  /** CSS property of textAlign */
  align?: React.CSSProperties['textAlign']
  /** JSX element to render. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend'
  children?: NativeDivAttributes['children']
  /** The id attribute of element */
  id?: NativeDivAttributes['id']
  /** CSS property of text-transform */
  transform?: React.CSSProperties['textTransform']
  /**  */
  responsive?: boolean
  level?: '1' | '2'
} & WithColor &
  Omit<NativeDivAttributes, 'color'>

export const Heading = React.forwardRef(
  (
    {
      align,
      children,
      as = 'h1',
      id,
      level = '2',
      responsive,
      transform,
      color = 'text',
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <ContainerBox
      {...props}
      $color={color}
      $level={level}
      $responsive={responsive}
      $textAlign={align}
      $textTransform={transform}
      as={as}
      id={id}
      ref={ref}
    >
      {children}
    </ContainerBox>
  ),
)

Heading.displayName = 'Heading'
