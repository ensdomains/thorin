import type {
  AllHTMLAttributes,
  ElementType,
  ReactElement } from 'react'
import React, {
  forwardRef,
} from 'react'
import { clsx } from 'clsx'

import {
  type Sprinkles,
  sprinkles,
} from '../../../css/sprinkles.css'

type HTMLProperties = Omit<
  AllHTMLAttributes<HTMLElement>,
  'as' | 'width' | 'height' | 'color' | 'translate' | 'transform'
>

export type BoxProps = Sprinkles &
  HTMLProperties & { as?: ElementType | ReactElement<any> }

export const Box = forwardRef<HTMLElement, BoxProps >(
  (
    { as = 'div', className, children, ...props },
    ref,
  ) => {
    const atomProps: Record<string, unknown> = {}
    const nativeProps: Record<string, unknown> = {}

    for (const key in props) {
      if (sprinkles.properties.has(key as keyof Omit<Sprinkles, 'reset'>)) {
        atomProps[key] = props[key as keyof typeof props]
      }
      else {
        nativeProps[key] = props[key as keyof typeof props]
      }
    }

    const atomicCss = sprinkles(atomProps)

    return React.createElement(as, {
      className: clsx(atomicCss, className),
      ...nativeProps,
      children,
      ref,
    })
  },
)
