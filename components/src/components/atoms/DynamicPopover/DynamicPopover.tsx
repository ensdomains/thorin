import * as React from 'react'
import styled, { css } from 'styled-components'
import { createPortal } from 'react-dom'
import debounce from 'lodash.debounce'

import { mq } from '@/src/utils/responsiveHelpers'

export type DynamicPopoverSide = 'top' | 'right' | 'bottom' | 'left'

export type DynamicPopoverAlignment = 'start' | 'center' | 'end'

const ANIMATION_DURATION = 350

export type DynamicPopoverAnimationFunc = (
  horizonalClearance: number,
  verticalClearance: number,
  side: DynamicPopoverSide,
  mobileSide: DynamicPopoverSide,
) => { translate: string; mobileTranslate: string }

type PopoverContainerProps = {
  $isOpen: boolean
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
  /** A react node that has includes the styling and content of the popover */
  popover: React.ReactNode
  /** The side and alignment of the popover in relation to the target */
  placement?: DynamicPopoverSide
  /** The side and alignment of the popover in relation to the target on mobile screen sizes */
  mobilePlacement?: DynamicPopoverSide
  /** A function that returns string of the css state for open and closed popover */
  animationFn?: DynamicPopoverAnimationFunc
  /** A React reference to the tooltip element */
  tooltipRef?: React.RefObject<HTMLDivElement>
  /** The id of the target element the tooltip will emerge from */
  targetId: string
  /** Function that will be called when the DynamicPopover is shown */
  onShowCallback?: () => void
  /** Width of the DynamicPopover*/
  width?: number
  /** Width of the DynamicPopover on mobile*/
  mobileWidth?: number
  /** Dynamic popover will switch sides if there is not enough room*/
  useIdealSide?: boolean
  /** Add to the default gap between the popover and its target */
  additionalGap?: number
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
    translate = `translate(${horizontalClearance * -1 + 10}px, 0)`
  else if (side === 'bottom') translate = `translate(0, ${verticalClearance}px)`
  else translate = `translate(${horizontalClearance - 10}px, 0);`

  let mobileTranslate = ''
  if (mobileSide === 'top')
    mobileTranslate = `translate(0, -${verticalClearance}px)`
  else if (mobileSide === 'right')
    mobileTranslate = `translate(${horizontalClearance * -1 + 10}px, 0)`
  else if (mobileSide === 'bottom')
    mobileTranslate = `translate(0, ${verticalClearance}px)`
  else mobileTranslate = `translate(${horizontalClearance - 10}px, 0);`

  return { translate, mobileTranslate }
}

// opacity: ${$isOpen ? 1 : 1};

const PopoverContainer = styled.div<PopoverContainerProps>(
  ({ $isOpen, $translate, $mobileTranslate, $width, $mobileWidth }) => css`
    position: absolute;
    box-sizing: border-box;
    z-index: 20;
    pointer-events: none;
    width: ${$mobileWidth}px;
    transform: ${$mobileTranslate};

    ${mq.md.min(css`
      width: ${$width}px;
      transform: ${$translate};
    `)}
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
  useIdealSide = false,
  additionalGap = 0,
}: DynamicPopoverProps) => {
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
  const popoverContainerRef = React.useRef<HTMLDivElement>(null)
  const mouseEnterTimeoutRef = React.useRef<boolean>(false)
  const mouseLeaveTimeoutRef = React.useRef<boolean>(false)

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

  const handleMouseenter = React.useCallback(
    debounce(
      () => {
        if (mouseLeaveTimeoutRef.current) {
          return
        }

        mouseEnterTimeoutRef.current = true
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
          const left =
            targetRect.x + targetRect.width / 2 - tooltipRect.width / 2
          const horizontalClearance =
            -tooltipRect.width + (targetRect.left - left) - additionalGap
          const verticalClearance = tooltipRect.height + additionalGap

          if (popoverElement) {
            popoverElement.style.transition = `initial`
            popoverElement.style.top = `${top}px`
            popoverElement.style.left = `${left}px`
            popoverElement.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(1, 0, 0.22, 1.6)`
          } else {
            console.error('no popover element')
          }

          const idealPlacement = computeIdealSide(
            placement,
            targetRect,
            tooltipRect,
            0,
            0,
          )

          const idealMobilePlacement = computeIdealSide(
            mobilePlacement,
            targetRect,
            tooltipRect,
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

          setTimeout(() => {
            if (!mouseLeaveTimeoutRef.current && popoverElement) {
              popoverElement.style.opacity = '1'
            }
            onShowCallback?.()
            mouseEnterTimeoutRef.current = false
          }, 200)
        }
      },
      ANIMATION_DURATION,
      { leading: true, trailing: false },
    ),
    [
      targetId,
      tooltipRef,
      setPositionState,
      setIsOpen,
      onShowCallback,
      additionalGap,
    ],
  )

  React.useEffect(() => {
    const targetElement = document.getElementById(targetId)
    const popoverElement = popoverContainerRef.current

    const handleMouseleave = debounce(
      () => {
        mouseLeaveTimeoutRef.current = true
        popoverElement.style.opacity = '0'

        //reset popover position to avoid intefering with screen width/height
        setTimeout(() => {
          if (!popoverElement) {
            console.error('no popover element')
            return
          }

          if (mouseEnterTimeoutRef.current) {
            setTimeout(() => {
              popoverElement.style.transition = 'initial'
              popoverElement.style.top = `10px`
              popoverElement.style.left = `10px`
              mouseLeaveTimeoutRef.current = false
            }, 300)
          } else {
            popoverElement.style.transition = 'initial'
            popoverElement.style.top = `10px`
            popoverElement.style.left = `10px`
            mouseLeaveTimeoutRef.current = false
          }
        }, ANIMATION_DURATION)
      },
      ANIMATION_DURATION,
      { leading: true, trailing: false },
    )

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
    useIdealSide ? positionState.idealPlacement : placement,
    useIdealSide ? positionState.idealMobilePlacement : mobilePlacement,
  )

  return createPortal(
    <PopoverContainer
      $isOpen={isOpen}
      $translate={translate}
      $mobileTranslate={mobileTranslate}
      $width={width}
      $mobileWidth={mobileWidth}
      id="popoverContainer"
      data-testid="popoverContainer"
      ref={popoverContainerRef}
    >
      {popover}
    </PopoverContainer>,
    document?.body,
  )
}

DynamicPopover.displayName = 'DynamicPopover'
