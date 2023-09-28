import React, { AllHTMLAttributes, ElementType, forwardRef } from 'react'

import { Sprinkles, rainbowSprinkles } from '../../../css/rainbow-spinkles.css'

type HTMLProperties = Omit<AllHTMLAttributes<HTMLElement>, 'as'>

export type BoxProps = Sprinkles & HTMLProperties & { as?: ElementType }

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as, children, ...props }, ref) => {
    const Component = as || 'div'
    const { className, style, otherProps } = rainbowSprinkles(props)
    return (
      <Component className={className} ref={ref} style={style} {...otherProps}>
        {children}
      </Component>
    )
  },
)
