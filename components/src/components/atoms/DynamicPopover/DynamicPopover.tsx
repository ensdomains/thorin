import * as React from 'react'

import styled from 'styled-components'
import clamp from 'lodash/clamp'

import { ButtonProps } from '../Button'

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

export type DynamicPopoverPopover = React.ReactNode & {
  x?: number
  y?: number
  side?: DynamicPopoverSide
  open?: boolean
}

export type DynamicPopoverButton = React.ReactElement & {
  pressed?: boolean
  onClick?: ButtonProps['onClick']
}

export interface DynamicPopoverProps {
  /** A Button component. The component will override the onClick and pressed properties of the button. */
  children: DynamicPopoverButton
  /** A react node that adopts the DynamicPopoverPopover props. */
  popover: DynamicPopoverPopover
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
        coords.x = clamp(coords.x, coordsRange.minX, coordsRange.maxX)
        break
      default:
        coords.y = clamp(coords.y, coordsRange.minY, coordsRange.maxY)
        break
    }
  }

  return { ...coords, side: idealSide }
}

const DynamicPopoverContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const DynamicPopover = ({
  popover,
  children,
  placement = 'top-center',
  offset = 10,
  padding = 20,
  flip = true,
  shift = true,
}: DynamicPopoverProps) => {
  const [open, setOpen] = React.useState(false)
  const [popoverProps, setPopoverProps] = React.useState({
    x: 0,
    y: 0,
    side: 'top',
  })

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const floatingRef = React.useRef<Element | null>(null)

  const computePopoverProps = React.useCallback(
    (container, floating) => {
      const fRect = floating.getBoundingClientRect()
      const rRect = container.getBoundingClientRect()
      const props = computeCoordsFromPlacement(
        rRect,
        fRect,
        placement,
        padding,
        offset,
        flip,
        shift,
      )
      setPopoverProps(props)
    },
    [placement, padding, offset, flip, shift, setPopoverProps],
  )

  // Handle clicks outside of the container
  const handleClickOutside = (e: any) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setOpen(false)
    }
  }

  React.useEffect(() => {
    if (containerRef.current && floatingRef.current && open) {
      computePopoverProps(containerRef.current, floatingRef.current)
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, computePopoverProps])

  return (
    <DynamicPopoverContainer data-testid="dynamicpopover" ref={containerRef}>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          pressed: open,
          onClick: () => setOpen((o) => !o),
        })}
      {React.isValidElement(popover) &&
        React.cloneElement(popover, {
          ref: floatingRef,
          open,
          ...popoverProps,
        })}
    </DynamicPopoverContainer>
  )
}

DynamicPopover.displayName = 'DynamicPopover'
