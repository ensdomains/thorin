import type {
  AllHTMLAttributes,
  ElementType,
  ReactElement } from 'react'
import React, {
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react'
import classNames from 'clsx'

import {
  type Sprinkles,
  rainbowSprinkles,
} from '@/src/css/rainbow-spinkles.css'

type HTMLProperties = Omit<
  AllHTMLAttributes<HTMLElement>,
  'as' | 'width' | 'height' | 'color' | 'translate' | 'transform'
>

export type BoxProps = Sprinkles &
  HTMLProperties & { as?: ElementType | ReactElement<any> }

export const Box = forwardRef<HTMLElement, BoxProps & { log?: boolean }>(
  (
    { as: _as, className: _className, style: _style, children, log, ...props },
    ref,
  ) => {
    const {
      className: sprinklesClassName,
      style: sprinklesStyle,
      otherProps,
    } = rainbowSprinkles(props)

    const className = classNames(sprinklesClassName, _className)
    const style = { ...sprinklesStyle, ..._style }

    if (isValidElement(_as)) {
      const as = _as as ReactElement<any>
      if (log) console.log('as', className, style, otherProps)
      return cloneElement(as, { className, style, ...otherProps })
    }
    const as = _as as ElementType
    const Component = as || 'div'
    if (log) console.log('as', className, style, otherProps)
    return (
      <Component className={className} ref={ref} style={style} {...otherProps}>
        {children}
      </Component>
    )
  },
)
