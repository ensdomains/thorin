import * as React from 'react'
import type { TransitionState } from 'react-transition-state'
import { useTransitionState } from 'react-transition-state'

import { Portal } from '../Portal/Portal'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import { getValueForTransitionState } from './utils/getValueForTransitionState'
import * as styles from './style.css'
import { debounce } from '../../../utils/debounce'
import { useBreakPoints } from '@/src/hooks/useBreakpoints'
import type { TransitionDuration } from '@/src/tokens'
import { assignInlineVars } from '@vanilla-extract/dynamic'

export type DynamicPopoverSide = 'top' | 'right' | 'bottom' | 'left'

export type DynamicPopoverAlignment = 'start' | 'center' | 'end'

export type PopoverProps = React.PropsWithChildren<{
  placement?: DynamicPopoverSide
  mobilePlacement?: DynamicPopoverSide
  state?: TransitionState['status']
}>

export type DynamicPopoverAnimationFunc = (
  horizonalClearance: number,
  verticalClearance: number,
  side: DynamicPopoverSide,
  mobileSide: DynamicPopoverSide,
  isDesktop: boolean,
) => string

export type DynamicPopoverButtonProps = {
  pressed?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

export type DynamicPopoverProps = {
  /** A react node that has includes the styling and content of the popover */
  popover: React.ReactElement<PopoverProps>
  /** The side and alignment of the popover in relation to the target */
  placement?: DynamicPopoverSide
  /** The side and alignment of the popover in relation to the target on mobile screen sizes */
  mobilePlacement?: DynamicPopoverSide
  /** A function that returns string of the css state for open and closed popover */
  animationFn?: DynamicPopoverAnimationFunc
  /** The id of the target element the tooltip will emerge from */
  anchorRef: React.RefObject<HTMLElement>
  /** Function that will be called when the DynamicPopover is shown */
  onShowCallback?: () => void
  /** Width of the DynamicPopover */
  width?: number | string
  /** Width of the DynamicPopover on mobile */
  mobileWidth?: number | string
  /** Dynamic popover will switch sides if there is not enough room */
  useIdealPlacement?: boolean
  /** Add to the default gap between the popover and its target */
  additionalGap?: number
  /** Aligns the popover */
  align?: DynamicPopoverAlignment
  /** The duration of the transition */
  transitionDuration?: TransitionDuration
  /** If this is not undefined, popover becomes externally controlled */
  isOpen?: boolean
  /** Hides the overflow of the content */
  hideOverflow?: boolean
}

/**
 * @desc Calculates the amount of space available at each of the different sides and returns the side that has space
 */
const computeIdealSide = (
  side: DynamicPopoverSide,
  referenceRect: DOMRect,
  floatingRect: DOMRect,
  padding: number,
  offset: number,
): DynamicPopoverSide => {
  const top = referenceRect.top - floatingRect.height - padding - offset
  const left = referenceRect.left - floatingRect.width - padding - offset
  const right
    = window.innerWidth
    - referenceRect.left
    - referenceRect.width
    - floatingRect.width
    - padding
    - offset
  const bottom
    = window.innerHeight
    - referenceRect.top
    - referenceRect.height
    - floatingRect.height
    - padding
    - offset

  if (side === 'top' && top < 0 && bottom > top) return 'bottom'
  if (side === 'right' && right < 0 && left > right) return 'left'
  if (side === 'bottom' && bottom < 0 && top > bottom) return 'top'
  if (side === 'left' && left < 0 && right > left) return 'right'
  return side
}

/**
 * @desc default function for computing the animation keyframes based on the side
 */
const defaultAnimationFunc: DynamicPopoverAnimationFunc = (
  horizontalClearance: number,
  verticalClearance: number,
  side: string,
  mobileSide: string,
  isDesktop: boolean,
) => {
  let translate = ''
  if (side === 'top') translate = `translate(0, -${verticalClearance}px)`
  else if (side === 'right')
    translate = `translate(${horizontalClearance}px, 0)`
  else if (side === 'bottom') translate = `translate(0, ${verticalClearance}px)`
  else translate = `translate(-${horizontalClearance}px, 0)`

  let mobileTranslate = ''
  if (mobileSide === 'top')
    mobileTranslate = `translate(0, -${verticalClearance}px)`
  else if (mobileSide === 'right')
    mobileTranslate = `translate(${horizontalClearance}px, 0)`
  else if (mobileSide === 'bottom')
    mobileTranslate = `translate(0, ${verticalClearance}px)`
  else mobileTranslate = `translate(-${horizontalClearance}px, 0)`

  return isDesktop ? translate : mobileTranslate
}

const checkRectContainsPoint = (
  rect?: DOMRect,
  point?: { x: number, y: number },
) => {
  if (!rect || !point) return false
  return (
    point.x >= rect.x
    && point.x <= rect.x + rect.width
    && point.y >= rect.y
    && point.y <= rect.y + rect.height
  )
}

type PopoverBoxProps = {
  $state: TransitionState
  $translate: string
  $width: number | string
  $mobileWidth: number | string
  $x: number
  $y: number
  // $isControlled: boolean
  $transitionDuration: TransitionDuration
  $hideOverflow: boolean | undefined
}

const PopoverBox = React.forwardRef<HTMLElement, BoxProps & PopoverBoxProps>(
  (
    {
      $state,
      $translate,
      $width,
      $mobileWidth,
      $x,
      $y,
      // $isControlled,
      $transitionDuration,
      $hideOverflow,
      ...props
    },
    ref,
  ) => (
    <Box
      {...props}
      boxSizing="border-box"
      className={styles.container}
      display="block"
      fontFamily="sans"
      style={{
        left: getValueForTransitionState($state.status, 'leftFunc')($x),
        top: getValueForTransitionState($state.status, 'topFunc')($y),
        transform: `translate3d(0,0,0) ${$translate}`,
        ...assignInlineVars({
          [styles.popoverBoxWidth]: typeof $width === 'string' ? $width : `${$width}px`,
          [styles.mobileWidth]: typeof $mobileWidth === 'string' ? $mobileWidth : `${$mobileWidth}px`,
        }),
      }}
      opacity={getValueForTransitionState($state.status, 'opacity')}
      overflow={$hideOverflow ? 'hidden' : 'visible'}
      pointerEvents={getValueForTransitionState($state.status, 'pointerEvents')}
      position="absolute"
      ref={ref}
      // transform={{
      //   base: `translate3d(0, 0, 0) ${$mobileTranslate}`,
      //   sm: `translate3d(0, 0, 0) ${$translate}`,
      // }}
      transitionDuration={$transitionDuration}
      transitionProperty={getValueForTransitionState(
        $state.status,
        'transitionProperty',
      )}
      visibility={getValueForTransitionState($state.status, 'visibility')}
      zIndex={999999}
    />
  ),
)

export const DynamicPopover: React.FC<DynamicPopoverProps> = ({
  popover,
  placement = 'top',
  mobilePlacement = 'top',
  animationFn: _animationFn,
  anchorRef,
  onShowCallback,
  width = 250,
  mobileWidth = 150,
  useIdealPlacement = false,
  additionalGap = 0,
  transitionDuration = 300,
  isOpen,
  align = 'center',
  hideOverflow,
}) => {
  const popoverContainerRef = React.useRef<HTMLDivElement>()

  const isControlled = isOpen !== undefined

  const [state, toggle] = useTransitionState({
    preEnter: true,
    exit: true,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: {
      enter: transitionDuration,
      exit: transitionDuration,
    },
  })

  const [positionState, setPositionState] = React.useState<{
    top: number
    left: number
    horizontalClearance: number
    verticalClearance: number
    idealPlacement: 'top' | 'right' | 'bottom' | 'left'
    idealMobilePlacement: 'top' | 'right' | 'bottom' | 'left'
  }>({
    top: 100,
    left: 100,
    horizontalClearance: 100,
    verticalClearance: 100,
    idealPlacement: placement,
    idealMobilePlacement: mobilePlacement,
  })

  const setPosition = React.useCallback(() => {
    const anchorElement = anchorRef?.current
    const anchorRect = anchorElement?.getBoundingClientRect()
    const popoverElement = popoverContainerRef?.current
    const popoverRect = popoverElement?.getBoundingClientRect()

    if (!popoverRect || !anchorRect) {
      return
    }

    let popoverWidth = popoverRect.width / 2
    let anchorWidth = anchorRect.width / 2
    let popoverHeight = popoverRect.height / 2
    let anchorHeight = anchorRect.height / 2
    if (placement === 'top' || placement === 'bottom') {
      if (align === 'start') {
        popoverWidth = 0
        anchorWidth = 0
      }
      else if (align === 'end') {
        popoverWidth = popoverRect.width
        anchorWidth = anchorRect.width
      }
    }
    else {
      if (align === 'start') {
        popoverHeight = 0
        anchorHeight = 0
      }
      else if (align === 'end') {
        popoverHeight = popoverRect.height
        anchorHeight = anchorRect.height
      }
    }

    const top = window.scrollY + anchorRect.y + anchorHeight - popoverHeight
    const left = anchorRect.x + anchorWidth - popoverWidth
    const horizontalClearance = popoverWidth + anchorWidth + additionalGap + 10
    const verticalClearance = popoverHeight + anchorHeight + additionalGap + 10

    const idealPlacement = computeIdealSide(
      placement,
      anchorRect,
      popoverRect,
      0,
      0,
    )

    const idealMobilePlacement = computeIdealSide(
      mobilePlacement,
      anchorRect,
      popoverRect,
      0,
      0,
    )

    setPositionState({
      top,
      left,
      horizontalClearance,
      verticalClearance,
      idealPlacement,
      idealMobilePlacement,
    })
  }, [placement, mobilePlacement, additionalGap, anchorRef, align])

  const refFunc = React.useCallback(
    (e: HTMLDivElement) => {
      if (e) {
        popoverContainerRef.current = e
        setPosition()
      }
    },
    [setPosition],
  )

  const animationFn = React.useMemo(() => {
    if (_animationFn) {
      return (
        horizontalClearance: number,
        verticalClearance: number,
        side: DynamicPopoverSide,
        mobileSide: DynamicPopoverSide,
        isDesktop: boolean,
      ) =>
        _animationFn(horizontalClearance, verticalClearance, side, mobileSide, isDesktop)
    }
    return (
      horizontalClearance: number,
      verticalClearance: number,
      side: DynamicPopoverSide,
      mobileSide: DynamicPopoverSide,
      isDesktop: boolean,
    ) =>
      defaultAnimationFunc(
        horizontalClearance,
        verticalClearance,
        side,
        mobileSide,
        isDesktop,
      )
  }, [_animationFn])

  // Attach and remove event listeners
  React.useEffect(() => {
    const handleResize = () => {
      setPosition()
    }

    const popoverElement = popoverContainerRef?.current
    const targetElement = anchorRef?.current
    let handleMouseEnter: (e: MouseEvent) => void
    let handleMouseLeave: (e: MouseEvent) => void
    let handleMouseMove: (e: MouseEvent) => void

    if (!isControlled) {
      handleMouseEnter = () => {
        toggle(true)
        onShowCallback?.()
      }

      const debouncedMouseMove = debounce(
        (e: MouseEvent) => {
          const cursorXY = { x: e.clientX, y: e.clientY }
          const targetRect = targetElement?.getBoundingClientRect()
          const popoverRect = popoverElement?.getBoundingClientRect()

          const targetContainsPoint = checkRectContainsPoint(
            targetRect,
            cursorXY,
          )
          const popoverContainsPoint = checkRectContainsPoint(
            popoverRect,
            cursorXY,
          )
          if (!targetContainsPoint && !popoverContainsPoint) toggle(false)
          document.removeEventListener('mousemove', handleMouseMove)
        },
        100,
        { maxWait: 1000 },
      )

      handleMouseMove = (e: MouseEvent) => {
        debouncedMouseMove(e)
      }

      handleMouseLeave = () => {
        document.addEventListener('mousemove', handleMouseMove)
      }

      targetElement?.addEventListener('mouseenter', handleMouseEnter)
      targetElement?.addEventListener('mouseleave', handleMouseLeave)
      popoverElement?.addEventListener('mouseenter', handleMouseEnter)
      popoverElement?.addEventListener('mouseleave', handleMouseLeave)
    }

    addEventListener('resize', handleResize)

    return () => {
      if (!isControlled) {
        targetElement?.removeEventListener('mouseenter', handleMouseEnter)
        targetElement?.removeEventListener('mouseleave', handleMouseLeave)
        popoverElement?.removeEventListener('mouseenter', handleMouseEnter)
        popoverElement?.removeEventListener('mouseleave', handleMouseLeave)
        document.removeEventListener('mousemove', handleMouseMove)
      }
      removeEventListener('resize', handleResize)
    }
  }, [
    placement,
    mobilePlacement,
    setPosition,
    positionState,
    additionalGap,
    onShowCallback,
    anchorRef,
    isControlled,
  ])

  React.useEffect(() => {
    const originalIsControlled = isControlled
    const originalIsOpen = isOpen
    if (isControlled) toggle(isOpen)
    return () => {
      if (originalIsControlled) toggle(!originalIsOpen)
    }
  }, [isControlled, isOpen])

  const _placement = useIdealPlacement
    ? positionState.idealPlacement
    : placement
  const _mobilePlacement = useIdealPlacement
    ? positionState.idealMobilePlacement
    : mobilePlacement

  const breakpoints = useBreakPoints()

  const translate = animationFn(
    positionState.horizontalClearance,
    positionState.verticalClearance,
    _placement,
    _mobilePlacement,
    breakpoints.sm,
  )

  const renderCallback = React.useCallback(() => {
    setPosition()
    onShowCallback?.()
  }, [setPosition, onShowCallback])

  return (
    <Portal renderCallback={renderCallback}>
      <PopoverBox
        $hideOverflow={hideOverflow}
        // $isControlled={isControlled}
        $mobileWidth={mobileWidth}
        $state={state}
        $transitionDuration={transitionDuration}
        $translate={translate}
        $width={width}
        $x={positionState.left}
        $y={positionState.top}
        data-testid="popoverContainer"
        id="popoverContainer"
        ref={refFunc}
      >
        {React.cloneElement(popover, {
          placement: _placement,
          mobilePlacement: _mobilePlacement,
          state: state.status,
        })}
      </PopoverBox>
    </Portal>
  )
}

DynamicPopover.displayName = 'DynamicPopover'
