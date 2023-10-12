import * as React from 'react'

import * as styles from './styles.css'
import { Box, BoxProps } from '../Box/Box'

const ScrollBoxBox = React.forwardRef<HTMLElement, BoxProps>((props, ref) => (
  <Box
    overflowX="auto"
    overflowY="auto"
    position="relative"
    ref={ref}
    transitionDuration="$150"
    transitionProperty="all"
    transitionTimingFunction="$inOut"
    {...props}
  />
))

const DividerBox = ({
  show,
  position,
}: {
  show: boolean
  position: 'top' | 'bottom'
}) => (
  <Box
    backgroundColor="$greyLight"
    bottom={position === 'bottom' ? '$0' : 'unset'}
    display="block"
    height="$px"
    left="$0"
    opacity={show ? 1 : 0}
    position="sticky"
    top={position === 'top' ? '$0' : 'unset'}
    transitionDuration="$150"
    transitionProperty="opacity"
    transitionTimingFunction="$inOut"
    width="$full"
    zIndex="100"
  />
)

type Props = {
  hideDividers?: boolean | { top?: boolean; bottom?: boolean }
  topTriggerPx?: number
  bottomTriggerPx?: number
  onReachedTop?: () => void
  onReachedBottom?: () => void
} & BoxProps

export const ScrollBox = ({
  hideDividers = false,
  topTriggerPx = 16,
  bottomTriggerPx = 16,
  onReachedTop,
  onReachedBottom,
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

  const funcRef = React.useRef<{
    onReachedTop?: () => void
    onReachedBottom?: () => void
  }>({ onReachedTop, onReachedBottom })

  const [showTop, setShowTop] = React.useState(false)
  const [showBottom, setShowBottom] = React.useState(false)

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
    intersectingTop[1] !== -1 && !hideTop && setShowTop(!intersectingTop[0])
    intersectingBottom[1] !== -1 &&
      !hideBottom &&
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
    <ScrollBoxBox
      // $showBottom={showBottom}
      // $showTop={showTop}
      className={styles.scrollBox}
      ref={ref}
      {...props}
    >
      <DividerBox position="top" show={showTop} />
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
      <DividerBox position="bottom" show={showBottom} />
    </ScrollBoxBox>
  )
}
