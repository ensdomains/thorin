import * as React from 'react'
import styled, { css } from 'styled-components'
import { TransitionState, useTransition } from 'react-transition-state'

import { debounce } from 'lodash'

import { mq } from '@/src/utils/responsiveHelpers'

import { Portal } from '../Portal'

export type DynamicPopoverSide = 'top' | 'right' | 'bottom' | 'left'

export type DynamicPopoverAlignment = 'start' | 'center' | 'end'

export type PopoverProps = React.PropsWithChildren<{
  placement: DynamicPopoverSide
  mobilePlacement: DynamicPopoverSide
  state?: TransitionState
}>

export type DynamicPopoverAnimationFunc = (
  horizonalClearance: number,
  verticalClearance: number,
  side: DynamicPopoverSide,
  mobileSide: DynamicPopoverSide,
) => { translate: string; mobileTranslate: string }

export type DynamicPopoverButtonProps = {
  pressed?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

export interface DynamicPopoverProps {
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
  /** Width of the DynamicPopover*/
  width?: number | string
  /** Width of the DynamicPopover on mobile*/
  mobileWidth?: number | string
  /** Dynamic popover will switch sides if there is not enough room*/
  useIdealPlacement?: boolean
  /** Add to the default gap between the popover and its target */
  additionalGap?: number
  /** Aligns the popover */
  align?: DynamicPopoverAlignment
  /** The duration of the transition */
  transitionDuration?: number
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
  const right =
    window.innerWidth -
    referenceRect.left -
    referenceRect.width -
    floatingRect.width -
    padding -
    offset
  const bottom =
    window.innerHeight -
    referenceRect.top -
    referenceRect.height -
    floatingRect.height -
    padding -
    offset

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
) => {
  let translate = ''
  if (side === 'top') translate = `translate(0, -${verticalClearance}px)`
  else if (side === 'right')
    translate = `translate(${horizontalClearance}px, 0)`
  else if (side === 'bottom') translate = `translate(0, ${verticalClearance}px)`
  else translate = `translate(-${horizontalClearance}px, 0);`

  let mobileTranslate = ''
  if (mobileSide === 'top')
    mobileTranslate = `translate(0, -${verticalClearance}px)`
  else if (mobileSide === 'right')
    mobileTranslate = `translate(${horizontalClearance}px, 0)`
  else if (mobileSide === 'bottom')
    mobileTranslate = `translate(0, ${verticalClearance}px)`
  else mobileTranslate = `translate(-${horizontalClearance}px, 0);`

  return { translate, mobileTranslate }
}

const checkRectContainsPoint = (
  rect?: DOMRect,
  point?: { x: number; y: number },
) => {
  if (!rect || !point) return false
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  )
}

const makeWidth = (width: number | string) =>
  typeof width === 'number' ? `${width}px` : width

const PopoverContainer = styled.div<{
  $state: TransitionState
  $translate: string
  $mobileTranslate: string
  $width: number | string
  $mobileWidth: number | string
  $x: number
  $y: number
  $isControlled: boolean
  $transitionDuration: number
  $hideOverflow: boolean | undefined
}>(
  ({
    $state,
    $translate,
    $mobileTranslate,
    $width,
    $mobileWidth,
    $x,
    $y,
    $isControlled,
    $transitionDuration,
    $hideOverflow,
  }) => [
    css`
      /* stylelint-disable */
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      /* stylelint-enable */

      /* Default state is unmounted */
      display: block;
      box-sizing: border-box;
      visibility: hidden;
      position: absolute;
      z-index: 99999;
      width: ${makeWidth($mobileWidth)};
      transform: translate3d(0, 0, 0) ${$mobileTranslate};
      transition: none;
      opacity: 0;
      pointer-events: none;
      top: 0;
      left: 0;

      ${$hideOverflow &&
      css`
        overflow: hidden;
      `}

      ${$state === 'preEnter' &&
      css`
        display: block;
        visibility: visible;
        top: ${$y}px;
        left: ${$x}px;
      `}

      ${$state === 'entering' &&
      css`
        display: block;
        visibility: visible;
        opacity: 1;
        transition: opacity ${$transitionDuration}ms ease-in-out;
        top: ${$y}px;
        left: ${$x}px;
      `}

      ${$state === 'entered' &&
      css`
        display: block;
        visibility: visible;
        opacity: 1;
        transition: opacity ${$transitionDuration}ms ease-in-out;
        top: ${$y}px;
        left: ${$x}px;
        pointer-events: initial;

        ${$isControlled &&
        css`
          pointer-events: auto;
        `}
      `}

      ${$state === 'exiting' &&
      css`
        display: block;
        visibility: visible;
        opacity: 0;
        transition: all ${$transitionDuration}ms ease-in-out;
        top: ${$y}px;
        left: ${$x}px;
      `}
    `,
    mq.sm.min(css`
      width: ${makeWidth($width)};
      transform: translate3d(0, 0, 0) ${$translate};
    `),
  ],
)

export const DynamicPopover = ({
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
  transitionDuration = 350,
  isOpen,
  align = 'center',
  hideOverflow,
}: DynamicPopoverProps) => {
  const popoverContainerRef = React.useRef<HTMLDivElement>()

  const isControlled = isOpen !== undefined

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
      } else if (align === 'end') {
        popoverWidth = popoverRect.width
        anchorWidth = anchorRect.width
      }
    } else {
      if (align === 'start') {
        popoverHeight = 0
        anchorHeight = 0
      } else if (align === 'end') {
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
      ) =>
        _animationFn(horizontalClearance, verticalClearance, side, mobileSide)
    }
    return (
      horizontalClearance: number,
      verticalClearance: number,
      side: DynamicPopoverSide,
      mobileSide: DynamicPopoverSide,
    ) =>
      defaultAnimationFunc(
        horizontalClearance,
        verticalClearance,
        side,
        mobileSide,
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
    if (isControlled) {
      toggle(isOpen)
    }
  }, [isControlled, isOpen])

  const [state, toggle] = useTransition({
    preEnter: true,
    exit: true,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: {
      enter: transitionDuration,
      exit: transitionDuration,
    },
  })

  const _placement = useIdealPlacement
    ? positionState.idealPlacement
    : placement
  const _mobilePlacement = useIdealPlacement
    ? positionState.idealMobilePlacement
    : mobilePlacement

  const { translate, mobileTranslate } = animationFn(
    positionState.horizontalClearance,
    positionState.verticalClearance,
    _placement,
    _mobilePlacement,
  )

  const renderCallback = React.useCallback(() => {
    setPosition()
    onShowCallback?.()
  }, [setPosition, onShowCallback])

  if (state === 'unmounted') return null

  return (
    <Portal renderCallback={renderCallback}>
      <PopoverContainer
        $hideOverflow={hideOverflow}
        $isControlled={isControlled}
        $mobileTranslate={mobileTranslate}
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
          state,
        })}
      </PopoverContainer>
    </Portal>
  )
}

DynamicPopover.displayName = 'DynamicPopover'
