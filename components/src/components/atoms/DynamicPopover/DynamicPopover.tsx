import * as React from 'react'
import styled, { css } from 'styled-components'
import { createPortal } from 'react-dom'

import { mq } from '@/src/utils/responsiveHelpers'

export type DynamicPopoverSide = 'top' | 'right' | 'bottom' | 'left'

export type DynamicPopoverAlignment = 'start' | 'center' | 'end'

export type DynamicPopoverPlacement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'left-start'
  | 'left-center'
  | 'left-end'
  | 'right-start'
  | 'right-center'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export type DynamicPopoverAnimationFunc = (
  horizonalClearance: number,
  verticalClearance: number,
  side: DynamicPopoverSide,
  mobileSide: DynamicPopoverSide,
) => { translate: string; mobileTranslate: string }

type DynamicPopoverPopoverProps = {
  $isOpen: boolean
  $hasFirstLoad: boolean
  $translate: string
  $mobileTranslate: string
  $width: number
  $mobileWidth: number
}

export type DynamicPopoverButtonProps = {
  pressed?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

export interface DynamicPopoverProps {
  /** A react node that has includes the styling and content of the popover. */
  popover: React.ReactNode
  /** The side and alignment of the popover in relation to the button. */
  placement?: DynamicPopoverSide
  /** The side and alignment of the popover in relation to the button on mobile screen sizes. */
  mobilePlacement?: DynamicPopoverSide
  /** The number of pixels between the button and the popover */
  offset?: number
  /** If shift is true, sets the minimum number of pixels between the popover and the viewport */
  padding?: number
  /** If true, will flip the popover to the opposite side if there is not enough space. */
  flip?: boolean
  /** If true, will shift the popover alignment to be remain visible. */
  shift?: boolean
  /** If true, will prevent the popover from appearing */
  disabled?: boolean
  /** If true, will display the popover */
  open?: boolean
  /** The setter for the isOpen variable */
  onDismiss?: () => void
  /** A function that returns string of the css state for open and closed popover. */
  animationFn?: DynamicPopoverAnimationFunc
  tooltipRef?: React.RefObject<HTMLDivElement>
  targetId: string
  onShowCallback?: () => void
  width?: number
  mobileWidth?: number
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

/** *
 * @desc compute the coordinates for placing the floating element at the edges of the viewport
 */
const computeCoordRange = (
  referenceRect: DOMRect,
  floatingRect: DOMRect,
  padding: number,
) => ({
  minX: -referenceRect.x + padding,
  maxX: window.innerWidth - floatingRect.width - referenceRect.x - padding,
  minY: -referenceRect.y + padding,
  maxY: window.innerHeight - floatingRect.height - referenceRect.y - padding,
})

export const computeCoordsFromPlacement = (
  reference: DOMRect,
  floating: DOMRect,
  placement: DynamicPopoverPlacement,
  padding: number,
  offset: number,
  flip = true,
  shift = true,
): { x: number; y: number; side: DynamicPopoverSide } => {
  const [side, alignment] = placement.split('-')
  const commonX = reference.width / 2 - floating.width / 2
  const commonY = reference.height / 2 - floating.height / 2
  const mainAxis = ['top', 'bottom'].includes(side) ? 'x' : 'y'
  const length = mainAxis === 'y' ? 'height' : 'width'
  const commonAlign = reference[length] / 2 - floating[length] / 2

  const idealSide: DynamicPopoverSide = flip
    ? computeIdealSide(
        side as DynamicPopoverSide,
        reference,
        floating,
        padding,
        offset,
      )
    : (side as DynamicPopoverSide)

  console.log('idealSide: ', idealSide)

  let coords
  switch (idealSide) {
    case 'top':
      coords = { x: commonX, y: -floating.height - offset }
      break
    case 'bottom':
      coords = { x: commonX, y: reference.height + offset }
      break
    case 'right':
      coords = { x: reference.width + offset, y: commonY }
      break
    case 'left':
      coords = { x: -floating.width - offset, y: commonY }
      break
    default:
      coords = { x: reference.x, y: reference.y }
  }

  switch (alignment) {
    case 'start':
      coords[mainAxis] -= commonAlign //* (rtl && isVertical ? -1 : 1)
      break
    case 'end':
      coords[mainAxis] += commonAlign //* (rtl && isVertical ? -1 : 1)
      break
    default:
  }

  // Shift
  if (shift) {
    const coordsRange = computeCoordRange(reference, floating, padding)
    switch (mainAxis) {
      case 'x':
        coords.x = Math.min(
          Math.max(coords.x, coordsRange.minX),
          coordsRange.maxX,
        )
        break
      default:
        coords.y = Math.min(
          Math.max(coords.y, coordsRange.minY),
          coordsRange.maxY,
        )
        break
    }
  }

  return { ...coords, side: idealSide }
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
  if (side === 'top')
    translate = `translate(0, -${verticalClearance - window.scrollY}px)`
  else if (side === 'right')
    translate = `translate(${horizontalClearance * -1 + 10}px, 0)`
  else if (side === 'bottom')
    translate = `translate(0, ${verticalClearance + window.scrollY}px)`
  else translate = `translate(${horizontalClearance - 10}px, 0);`

  let mobileTranslate = ''
  if (mobileSide === 'top')
    mobileTranslate = `translate(0, -${verticalClearance - window.scrollY}px)`
  else if (mobileSide === 'right')
    mobileTranslate = `translate(${horizontalClearance * -1 + 10}px, 0)`
  else if (mobileSide === 'bottom')
    mobileTranslate = `translate(0, ${verticalClearance + window.scrollY}px)`
  else mobileTranslate = `translate(${horizontalClearance - 10}px, 0);`

  return { translate, mobileTranslate }
}

const PopoverContainer = styled.div<DynamicPopoverPopoverProps>(
  ({
    $isOpen,
    $hasFirstLoad,
    $translate,
    $mobileTranslate,
    $width,
    $mobileWidth,
  }) => css`
    position: absolute;
    box-sizing: border-box;
    z-index: 20;
    pointer-events: none;
    width: ${$mobileWidth}px;
    transform: ${$isOpen ? $mobileTranslate : 'translate(0, 0)'};
    opacity: ${$isOpen ? 1 : 0};
    visibility: ${$isOpen ? 'visible' : 'hidden'};

    ${mq.md.min(css`
      width: ${$width}px;
      transform: ${$isOpen ? $translate : 'translate (0, 0)'};
    `)}

    ${$hasFirstLoad && `transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6);`}
  `,
)

export const DynamicPopover = ({
  popover,
  placement = 'top',
  mobilePlacement = 'top',
  animationFn: _animationFn,
  tooltipRef,
  targetId,
  onShowCallback,
  width = 250,
  mobileWidth = 150,
}: DynamicPopoverProps) => {
  const [positionState, setPositionState] = React.useState<{
    top: number
    left: number
    horizontalClearance: number
    verticalClearance: number
  }>({
    top: 100,
    left: 100,
    horizontalClearance: 100,
    verticalClearance: 100,
  })
  const popoverContainerRef = React.useRef<HTMLDivElement>(null)

  // This is used to prevent animations when first setting the tooltip position
  const [hasFirstLoad, setHasFirstLoad] = React.useState(false)

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

  const [isOpen, setIsOpen] = React.useState(false)

  const handleMouseenter = React.useCallback(() => {
    const targetElement = document.getElementById(targetId)
    const targetRect = targetElement?.getBoundingClientRect()
    const tooltipElement = tooltipRef?.current
    const tooltipRect = tooltipElement?.getBoundingClientRect()
    const popoverElement = popoverContainerRef.current

    if (targetRect && tooltipRect) {
      const top =
        window.scrollY +
        targetRect.y +
        targetRect.height / 2 -
        tooltipRect.height / 2
      const left = targetRect.x + targetRect.width / 2 - tooltipRect.width / 2
      const horizontalClearance = -tooltipRect.width + (targetRect.left - left)
      const verticalClearance = tooltipRect.height

      if (popoverElement) {
        popoverElement.style.top = `${top}px`
        popoverElement.style.left = `${left}px`
      } else {
        console.error('no popover element')
      }

      setHasFirstLoad(true)

      const reference = targetRect
      const floating = tooltipRect
      const placement = 'right-center'
      const padding = 0
      const offset = 0
      const flip = true
      const shift = true

      const computedCoords = computeCoordsFromPlacement(
        reference,
        floating,
        placement,
        padding,
        offset,
        flip,
        shift,
      )

      const idealSide = computeIdealSide(
        'right',
        reference,
        floating,
        padding,
        offset,
      )

      console.log('idealSide: ', idealSide)
      console.log('targetRect: ', targetRect)
      console.log('originalCoords: ', {
        top,
        left,
        horizontalClearance,
        verticalClearance,
      })
      console.log('computedCoords: ', computedCoords)

      setPositionState({ top, left, horizontalClearance, verticalClearance })
      setIsOpen(true)
      onShowCallback?.()
    }
  }, [
    targetId,
    tooltipRef,
    setHasFirstLoad,
    setPositionState,
    setIsOpen,
    onShowCallback,
  ])

  React.useEffect(() => {
    const targetElement = document.getElementById(targetId)

    const handleMouseleave = () => {
      setIsOpen(false)
    }
    targetElement?.addEventListener('mouseenter', handleMouseenter)
    targetElement?.addEventListener('mouseleave', handleMouseleave)

    return () => {
      targetElement?.removeEventListener('mouseover', handleMouseenter)
      targetElement?.removeEventListener('mouseleave', handleMouseleave)
    }
  }, [targetId, setIsOpen, handleMouseenter])

  const { translate, mobileTranslate } = animationFn(
    positionState.horizontalClearance,
    positionState.verticalClearance,
    placement,
    mobilePlacement,
  )

  return createPortal(
    <PopoverContainer
      $hasFirstLoad={hasFirstLoad}
      $isOpen={isOpen}
      $mobileTranslate={mobileTranslate}
      $mobileWidth={mobileWidth}
      $translate={translate}
      $width={width}
      id="popoverContainer"
      ref={popoverContainerRef}
    >
      {popover}
    </PopoverContainer>,
    document?.body,
  )
}

DynamicPopover.displayName = 'DynamicPopover'
