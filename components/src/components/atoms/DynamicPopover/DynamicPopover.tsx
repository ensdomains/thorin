import * as React from 'react'
import styled, { css } from 'styled-components'
import ReactDOM from 'react-dom'

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
  side: DynamicPopoverSide,
  open?: boolean,
) => string

type DynamicPopoverPopoverProps = {
  $x?: number
  $y?: number
  $side?: DynamicPopoverSide
  $open?: boolean
  $injectedCSS?: string
}

export type DynamicPopoverButtonProps = {
  pressed?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

export interface DynamicPopoverProps {
  /** A Button component. The component will override the onClick and pressed properties of the button. */
  children: React.ReactElement<DynamicPopoverButtonProps>
  /** A react node that has includes the styling and content of the popover. */
  popover: React.ReactNode
  /** The side and alignment of the popover in relation to the button. */
  placement?: DynamicPopoverPlacement
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
  horizontalClearance,
  verticalClearance,
  side: string,
  open = false,
) => {
  let translate = ''
  if (side === 'top')
    translate = `translate(0, -${verticalClearance - window.scrollY}px)`
  else if (side === 'right')
    translate = `translate(${horizontalClearance * -1 + 10}px, 0)`
  else if (side === 'bottom')
    translate = `translate(0, ${verticalClearance + window.scrollY}px)`
  else translate = `translate(${horizontalClearance - 10}px, 0);`
  if (open) {
    return `
      transform: ${translate};
      opacity: 1;
      visibility: visible;
   `
  }
  return `
    transform: translate(0, 0);
    opacity: 0;
    visibility: hidden;
  `
}

const PopoverContainer = styled.div<DynamicPopoverPopoverProps>(
  ({ $injectedCSS, $isOpen, $hasFirstLoad }) => css`
    position: absolute;
    box-sizing: border-box;
    z-index: 20;
    opacity: 0;
    pointer-events: none;
    ${$hasFirstLoad && `transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6);`}
    ${$injectedCSS &&
    css`
      ${$injectedCSS}
    `}
  `,
)

export const DynamicPopover = ({
  popover,
  placement = 'top',
  animationFn: _animationFn,
  tooltipRef,
  targetId,
}: DynamicPopoverProps) => {
  const [positionState, setPositionState] = React.useState({
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
        horizontalClearance,
        verticalClearance,
        side: DynamicPopoverSide,
        open: boolean,
      ) => _animationFn(horizontalClearance, verticalClearance, side, open)
    }
    return (
      horizontalClearance,
      verticalClearance,
      side: DynamicPopoverSide,
      open: boolean,
    ) =>
      defaultAnimationFunc(horizontalClearance, verticalClearance, side, open)
  }, [_animationFn])

  const [isOpen, setIsOpen] = React.useState(true)

  const handleMouseenter = React.useCallback(() => {
    const targetElement = document.getElementById(targetId)
    const targetRect = targetElement?.getBoundingClientRect()
    const tooltipElement = tooltipRef.current
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

      popoverElement.style.top = `${top}px`
      popoverElement.style.left = `${left}px`

      setHasFirstLoad(true)

      setPositionState({ top, left, horizontalClearance, verticalClearance })
      setIsOpen(true)
    }
  }, [targetId])

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
  }, [])

  const injectedCss = animationFn(
    positionState.horizontalClearance,
    positionState.verticalClearance,
    placement,
    isOpen,
  )

  return ReactDOM.createPortal(
    <PopoverContainer
      ref={popoverContainerRef}
      id="popoverContainer"
      $injectedCSS={injectedCss}
      $isOpen={isOpen}
      $hasFirstLoad={hasFirstLoad}
    >
      {popover}
    </PopoverContainer>,
    document?.body,
  )
}

DynamicPopover.displayName = 'DynamicPopover'
