import * as React from 'react'

import * as styles from './styles.css'
import { Box, BoxProps } from '../Box/Box'
import { commonVars } from '@/src/css/theme.css'
import { Space } from '@/src/tokens'

const ScrollBoxBox = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box
    ref={ref}
    classNames={styles.scrollBox}
    {...props}
  />
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
  style={horizontalPadding ? { width: `calc(100% - 2 * ${commonVars.space[horizontalPadding]})`} : {}}
    backgroundColor={show ? '$border' : 'transparent'}
    bottom={position === 'bottom' ? '-$px' : 'unset'}
    data-testid={`scrollbox-${position}-divider`}
    display="block"
    height="$px"
    left={horizontalPadding ? commonVars.space[horizontalPadding] :"$0"}
    position="absolute"
    top={position === 'top' ? '$0' : 'unset'}
    transitionDuration="$150"
    transitionProperty="background-color"
    transitionTimingFunction="$inOut"
    width="$full"
    zIndex="100"
  />)}

type Props = {
  /** If true, the dividers will be hidden */
  hideDividers?: boolean | { top?: boolean; bottom?: boolean }
  /** If true, the dividers will always be shown */
  alwaysShowDividers?: boolean | { top?: boolean; bottom?: boolean }
  /** The number of pixels below the top of the content where events such as showing/hiding dividers and onReachedTop will be executed */
  topTriggerPx?: number
  /** The number of pixels above the bottom of the content where events such as showing/hiding dividers and onReachedTop will be executed */
  bottomTriggerPx?: number
  /** A callback function that is fired when the content reaches topTriggerPx */
  onReachedTop?: () => void
  /** A callback function that is fired when the content reaches bottomTriggerPx */
  onReachedBottom?: () => void
  /** The amount of horizontal padding to apply to the scrollbox. This will decrease the content area as well as the width of the overflow indicator dividers*/
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

  const hideTop =
    typeof hideDividers === 'boolean' ? hideDividers : !!hideDividers?.top
  const hideBottom =
    typeof hideDividers === 'boolean' ? hideDividers : !!hideDividers?.bottom
  const alwaysShowTop =
    typeof alwaysShowDividers === 'boolean'
      ? alwaysShowDividers
      : !!alwaysShowDividers?.top
  const alwaysShowBottom =
    typeof alwaysShowDividers === 'boolean'
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
      const iref =
        entry.target === topRef.current ? intersectingTop : intersectingBottom
      if (entry.time > iref[1]) {
        iref[0] = entry.isIntersecting
        iref[1] = entry.time
      }
    }
    intersectingTop[1] !== -1 &&
      !hideTop &&
      !alwaysShowTop &&
      setShowTop(!intersectingTop[0])
    intersectingBottom[1] !== -1 &&
      !hideBottom &&
      !alwaysShowBottom &&
      setShowBottom(!intersectingBottom[0])
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
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomTriggerPx, topTriggerPx])

  React.useEffect(() => {
    funcRef.current = { onReachedTop, onReachedBottom }
  }, [onReachedTop, onReachedBottom])

  return (
    <Box
      position="relative"
      border="solid $px transparent"
      width="$full"
      height="$full"
      borderLeftWidth="$0"
      borderRightWidth="$0"
      {...props}
    >
      <ScrollBoxBox style={horizontalPadding ? {
        padding: `0 ${commonVars.space[horizontalPadding]}`,
      } : {}}>
        <Box data-testid="scrollbox-top-intersect" ref={topRef} 
        display="block" height="$0"
        />
        {children}
        <Box data-testid="scrollbox-bottom-intersect" ref={bottomRef} 
        display="block" height="$0"
        />
      </ScrollBoxBox>
      <DividerBox data-testid="scrollbox-top-line" show={showTop} position='top' horizontalPadding={horizontalPadding}/>
      <DividerBox data-testid="scrollbox-bottom-line" show={showBottom} position='bottom' horizontalPadding={horizontalPadding}/>
    </Box>
  )
}
