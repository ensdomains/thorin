import * as React from 'react'
import styled, { css } from 'styled-components'
import { useDocumentEvent } from '../../../hooks/useDocumentEvent'
import useHover from 'react-use/lib/useHover'
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
  side: string,
  open = false,
) => {
  let translate = ''
  if (side === 'top') translate = `translate(0, 3em)`
  else if (side === 'right') translate = `translate(-3em, 0)`
  else if (side === 'bottom') translate = `translate(0, -3em)`
  else translate = `translate(3em, 0);`
  if (open)
    return `
      transform: translate(0, 0);
      opacity: 1;
      visibility: visible;
    `
  return `
    transform: ${translate};
    opacity: 0;
    visibility: hidden;
  `
}

const Container = styled.div(
  ({ disabled }) => css`
    position: relative;
    display: inline-block;
    cursor: ${disabled ? 'initial' : 'auto'};
  `,
)

const PopoverContainer = styled.div<DynamicPopoverPopoverProps>(
  ({ $injectedCSS, $x, $y }) => css`
    position: absolute;
    box-sizing: border-box;
    z-index: 20;
    visibility: hidden;
    opacity: 0;
    transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6);
    pointer-events: none;
    left: ${$x}px;
    top: ${$y}px;
    ${$injectedCSS &&
    css`
      ${$injectedCSS}
    `}
  `,
)

export const DynamicPopover = ({
  popover,
  children,
  placement = 'top',
  offset = 10,
  padding = 20,
  flip = true,
  shift = true,
  animationFn: _animationFn,
  disabled = false,
  open = false,
  tooltipRef,
  targetId,
  onDismiss,
}: DynamicPopoverProps) => {
  const element = (isHovering: boolean) => {
    const animationFn = React.useMemo(() => {
      if (_animationFn) {
        return (side: DynamicPopoverSide, open: boolean) =>
          _animationFn(side, open)
      }
      return (side: DynamicPopoverSide, open: boolean) =>
        defaultAnimationFunc(side, open)
    }, [_animationFn])

    const [popoverProps, setPopoverProps] =
      React.useState<DynamicPopoverPopoverProps>({
        $x: 0,
        $y: 0,
        $side: undefined,
        $open: open,
        $injectedCSS: '',
      })

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const floatingRef = React.useRef<HTMLDivElement | null>(null)

    const computePopoverProps = React.useCallback(
      (container, floating) => {
        const fRect = floating.getBoundingClientRect()
        const rRect = container.getBoundingClientRect()
        return computeCoordsFromPlacement(
          rRect,
          fRect,
          placement,
          padding,
          offset,
          flip,
          shift,
        )
      },
      [placement, padding, offset, flip, shift],
    )

    React.useEffect(() => {
      if (
        containerRef.current &&
        floatingRef.current &&
        animationFn &&
        computePopoverProps
      ) {
        // const isOpen = !!open && !disabled
        // const isOpen = isHovering
        const isOpen = true
        const { x, y, side } = computePopoverProps(
          containerRef.current,
          floatingRef.current,
        )
        const injectedCss = animationFn(side, isOpen)
        setPopoverProps({
          $x: x,
          $y: y,
          $side: side,
          $open: open,
          $injectedCSS: injectedCss,
        })
      }
    }, [
      open,
      disabled,
      setPopoverProps,
      computePopoverProps,
      animationFn,
      isHovering,
    ])

    // Handle clicks outside of the container
    // useDocumentEvent(
    //   containerRef,
    //   'click',
    //   () => onDismiss && onDismiss(),
    //   open,
    // )

    return (
      <Container
        data-testid="dynamicpopover"
        ref={containerRef}
        disabled={disabled}
      >
        {children}
        <PopoverContainer
          data-testid="dynamicpopover-popover"
          {...popoverProps}
          ref={floatingRef}
        >
          {popover}
        </PopoverContainer>
      </Container>
    )
  }
  const [newReactElement, isHovering] = useHover(element)

  const [positionState, setPositionState] = React.useState({
    top: 100,
    left: 100,
  })

  const [isOpen, setIsOpen] = React.useState(false)

  const handleMouseenter = React.useCallback(() => {
    const targetElement = document.getElementById(targetId)
    const targetRect = targetElement?.getBoundingClientRect()
    const tooltipElement = tooltipRef.current
    const tooltipRect = tooltipElement?.getBoundingClientRect()
    console.log('tragetRect: ', targetRect)
    console.log('tooltipRect: ', tooltipRect)

    if (targetRect) {
      if (placement === 'top') {
        const top = targetRect?.top - tooltipRect?.height - 10
        const left =
          targetRect?.left + targetRect?.width / 2 - tooltipRect?.width / 2

        setPositionState({
          top: top + window.scrollY,
          left,
        })
        setIsOpen(true)
        return
      }
      if (placement === 'bottom') {
        const top = targetRect?.bottom + 10
        const left =
          targetRect?.left + targetRect?.width / 2 - tooltipRect?.width / 2

        setPositionState({
          top: top + window.scrollY,
          left,
        })
        setIsOpen(true)
        return
      }
      if (placement === 'left') {
        const top =
          targetRect?.top + targetRect?.height / 2 - tooltipRect?.height / 2
        const left = targetRect?.left - tooltipRect?.width - 10

        setPositionState({
          top: top + window.scrollY,
          left,
        })
        setIsOpen(true)
        return
      }
      if (placement === 'right') {
        const top =
          targetRect?.top + targetRect?.height / 2 - tooltipRect?.height / 2
        const left = targetRect?.right + 10

        setPositionState({
          top: top + window.scrollY,
          left,
        })
        setIsOpen(true)
        return
      }
    }
  }, [targetId])

  React.useEffect(() => {
    const targetElement = document.getElementById(targetId)
    const handleMouseleave = (event) => {
      setIsOpen(false)
    }
    targetElement?.addEventListener('mouseenter', handleMouseenter)
    targetElement?.addEventListener('mouseleave', handleMouseleave)

    return () => {
      targetElement?.removeEventListener('mouseover', handleMouseenter)
      targetElement?.removeEventListener('mouseleave', handleMouseleave)
    }
  }, [])

  const injectedCss = defaultAnimationFunc(placement, isOpen)

  return ReactDOM.createPortal(
    <PopoverContainer
      id="popoverContainer"
      $x={positionState.left}
      $y={positionState.top}
      $injectedCSS={injectedCss}
    >
      {popover}
    </PopoverContainer>,
    document?.body,
  )
}

DynamicPopover.displayName = 'DynamicPopover'
