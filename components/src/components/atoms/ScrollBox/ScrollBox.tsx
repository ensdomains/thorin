/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react'

import { commonVars } from '@/src/css/theme.css'

import type { Space } from '@/src/tokens'

import * as styles from './styles.css'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import clsx from 'clsx'

const ScrollBoxBox = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box className={clsx(styles.scrollBox, props.className)} ref={ref} {...props} />
))

const DividerBox = ({
  show,
  position,
  horizontalPadding,
}: {
  show: boolean
  position: 'top' | 'bottom'
  horizontalPadding?: Space
}) => {
  return (
    <Box
      backgroundColor={show ? '$border' : 'transparent'}
      bottom={position === 'bottom' ? '-$px' : 'unset'}
      visibility={show ? 'visible' : 'hidden'}
      data-testid={`scrollbox-${position}-divider`}
      display="block"
      height="$px"
      left={horizontalPadding ? commonVars.space[horizontalPadding] : '$0'}
      position="absolute"
      style={
        horizontalPadding
          ? { width: `calc(100% - 2 * ${commonVars.space[horizontalPadding]})` }
          : {}
      }
      top={position === 'top' ? '$0' : 'unset'}
      transitionDuration="$150"
      transitionProperty="background-color"
      transitionTimingFunction="$inOut"
      width="$full"
      zIndex="100"
    />
  )
}

type Props = {
  /** If true, the dividers will be hidden */
  hideDividers?: boolean | { top?: boolean, bottom?: boolean }
  /** If true, the dividers will always be shown */
  alwaysShowDividers?: boolean | { top?: boolean, bottom?: boolean }
  /** The number of pixels below the top of the content where events such as showing/hiding dividers and onReachedTop will be executed */
  topTriggerPx?: number
  /** The number of pixels above the bottom of the content where events such as showing/hiding dividers and onReachedTop will be executed */
  bottomTriggerPx?: number
  /** A callback function that is fired when the content reaches topTriggerPx */
  onReachedTop?: () => void
  /** A callback function that is fired when the content reaches bottomTriggerPx */
  onReachedBottom?: () => void
  /** The amount of horizontal padding to apply to the scrollbox. This will decrease the content area as well as the width of the overflow indicator dividers */
  horizontalPadding?: Space
} & BoxProps

export const ScrollBox = ({
  hideDividers = false,
  alwaysShowDividers = false,
  topTriggerPx = 16,
  bottomTriggerPx = 16,
  onReachedTop,
  onReachedBottom,
  horizontalPadding,
  children,
  ...props
}: Props) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const topRef = React.useRef<HTMLDivElement>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  const hideTop
    = typeof hideDividers === 'boolean' ? hideDividers : !!hideDividers?.top
  const hideBottom
    = typeof hideDividers === 'boolean' ? hideDividers : !!hideDividers?.bottom
  const alwaysShowTop
    = typeof alwaysShowDividers === 'boolean'
      ? alwaysShowDividers
      : !!alwaysShowDividers?.top
  const alwaysShowBottom
    = typeof alwaysShowDividers === 'boolean'
      ? alwaysShowDividers
      : !!alwaysShowDividers?.bottom

  const funcRef = React.useRef<{
    onReachedTop?: () => void
    onReachedBottom?: () => void
  }>({ onReachedTop, onReachedBottom })

  const [showTop, setShowTop] = React.useState(alwaysShowTop)
  const [showBottom, setShowBottom] = React.useState(alwaysShowBottom)

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const intersectingTop: [boolean, number] = [false, -1]
    const intersectingBottom: [boolean, number] = [false, -1]
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i]
      const iref
        = entry.target === topRef.current ? intersectingTop : intersectingBottom
      if (entry.time > iref[1]) {
        iref[0] = entry.isIntersecting
        iref[1] = entry.time
      }
    }
    intersectingTop[1] !== -1
    && !hideTop
    && !alwaysShowTop
    && setShowTop(!intersectingTop[0])
    intersectingBottom[1] !== -1
    && !hideBottom
    && !alwaysShowBottom
    && setShowBottom(!intersectingBottom[0])
    intersectingTop[0] && funcRef.current.onReachedTop?.()
    intersectingBottom[0] && funcRef.current.onReachedBottom?.()
  }

  React.useEffect(() => {
    const el = ref.current
    const topEl = topRef.current
    const bottomEl = bottomRef.current
    let observer: IntersectionObserver
    if (el && topEl && bottomEl) {
      observer = new IntersectionObserver(handleIntersect, {
        root: el,
        threshold: 1,
        rootMargin: `${topTriggerPx}px 0px ${bottomTriggerPx}px 0px`,
      })
      observer.observe(topEl)
      observer.observe(bottomEl)
    }
    return () => {
      observer?.disconnect()
    }
  }, [bottomTriggerPx, topTriggerPx])

  React.useEffect(() => {
    funcRef.current = { onReachedTop, onReachedBottom }
  }, [onReachedTop, onReachedBottom])

  return (
    <Box
      border="solid $px transparent"
      style={{
        borderLeftWidth: 0,
        borderRightWidth: 0,
      }}
      height="$full"
      position="relative"
      width="$full"
      {...props}
    >
      <ScrollBoxBox
        style={
          horizontalPadding
            ? {
                padding: `0 ${commonVars.space[horizontalPadding]}`,
              }
            : {}
        }
        ref={ref}
      >
        <Box
          data-testid="scrollbox-top-intersect"
          display="block"
          height="$0"
          ref={topRef}
        />
        {children}
        <Box
          data-testid="scrollbox-bottom-intersect"
          display="block"
          height="$0"
          ref={bottomRef}
        />
      </ScrollBoxBox>
      <DividerBox
        data-testid="scrollbox-top-line"
        horizontalPadding={horizontalPadding}
        position="top"
        show={showTop}
      />
      <DividerBox
        data-testid="scrollbox-bottom-line"
        horizontalPadding={horizontalPadding}
        position="bottom"
        show={showBottom}
      />
    </Box>
  )
}
